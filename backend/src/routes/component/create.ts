import { Session } from "neo4j-driver";
import { GraphRecord, ScoreComponentConfig, Stat } from "../../types/schema";
import crypto from "crypto";

export async function createScoreComponentConfig(
  session: Session,
  config: ScoreComponentConfig,
  modId: string,
) {
  config.id = crypto.randomUUID();
  config.stats.forEach((s: Stat) => (s.id = crypto.randomUUID()));
  config.statIds = config.stats.map((s: Stat) => s.id);

  const createConfigQuery = `
    CREATE (config:ComponentConfig {
      id: $id,
      name: $name,
      maxValue: $maxValue,
      minValue: $minValue,
      derivedFormulaInput: $derivedFormulaInput,
      roundDown: $roundDown,
      includeStats: $includeStats,
      includeModifiers: $includeModifiers,
      displaySign: $displaySign,
      statIds: $statIds
    })
    RETURN config`;

  const createStatsQuery = `
    MATCH (config:ComponentConfig {id: $configId})
    WITH config, $stats AS stats
    UNWIND stats AS stat
    CREATE (s:Stat {
      id: stat.id,
      label: stat.label,
      reference: stat.reference,
      modifierReference: stat.modifierReference
    })
    CREATE (config)-[:CONTAINS]->(s)
    RETURN config, collect(s) AS stats`;

  const attachToModQuery = `
    MATCH (config:ComponentConfig { id: $configId})
    MATCH (mod:Mod {id: $modId })
    CREATE (mod)-[:CREATES]->(config);
  `;

  try {
    const result = await session.executeWrite(async (tx) => {
      // Create the config node
      const configResult = await tx.run(createConfigQuery, {
        id: config.id,
        name: config.name,
        maxValue: config.maxValue,
        minValue: config.minValue,
        derivedFormulaInput: config.derivedFormulaInput,
        roundDown: config.roundDown,
        includeStats: config.includeStats,
        includeModifiers: config.includeModifiers,
        displaySign: config.displaySign,
        statIds: config.statIds,
      });
      console.log("Config created:", configResult);

      // Create stats and attach to config
      const statsResult = await tx.run(createStatsQuery, {
        configId: config.id,
        stats: config.stats,
      });
      console.log(
        "Stats created and attached to config:",
        statsResult.records[0].get("stats"),
      );

      const attachToModResult = await tx.run(attachToModQuery, {
        configId: config.id,
        modId,
      });
      console.log("attached config to mod:", attachToModResult.records[0]);

      const savedConfig = statsResult.records[0].get("config").properties;
      const savedStats = statsResult.records[0]
        .get("stats")
        .map((s: GraphRecord<Stat>) => s.properties);
      return { config: savedConfig, stats: savedStats };
    });

    console.log("Config and stats created successfully.");
    return result;
  } catch (error) {
    console.error("Error creating config and stats:", error);
  }
}

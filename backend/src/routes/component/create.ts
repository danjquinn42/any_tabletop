import { Session } from "neo4j-driver";
import { ScoreComponentConfig } from "../../../types/schema";
import crypto from "crypto";

async function createScoreComponentConfig(
  session: Session,
  config: ScoreComponentConfig,
  gameId: string,
) {
  config.id = crypto.randomUUID();

  const createConfigQuery = `
    CREATE (config:ScoreComponentConfig {
      id: $id,
      name: $name,
      maxValue: $maxValue,
      minValue: $minValue,
      derivedFormulaInput: $derivedFormulaInput,
      roundDown: $roundDown,
      includeStats: $includeStats,
      includeModifiers: $includeModifiers,
      displaySign: $displaySign
    })
    RETURN config`;

  const attachConfigToGameQuery = `
    MATCH (game:Game {id: $gameId})
    MATCH (config:ScoreComponentConfig {id: $configId})
    CREATE (game)-[:CONTAINS]->(config)`;

  const createStatsQuery = `
    MATCH (config:ScoreComponentConfig {id: $configId})
    WITH config, $stats AS stats
    UNWIND stats AS stat
    CREATE (s:Stat {
      id: stat.id,
      label: stat.label,
      reference: stat.reference,
      modifierReference: stat.modifierReference
    })
    CREATE (config)-[:DEFINES]->(s)
    RETURN config, collect(s) AS stats`;

  try {
    await session.writeTransaction(async (tx) => {
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
      });
      console.log("Config created:", configResult);

      // Attach config to game
      const attachResult = await tx.run(attachConfigToGameQuery, {
        gameId: gameId,
        configId: config.id,
      });
      console.log("Config attached to game:", attachResult);

      // Create stats and attach to config
      const statsResult = await tx.run(createStatsQuery, {
        configId: config.id,
        stats: config.stats,
      });
      console.log("Stats created and attached to config:", statsResult);
    });

    console.log("Config and stats created successfully.");
  } catch (error) {
    console.error("Error creating config and stats:", error);
  }
}

module.exports = createScoreComponentConfig;

import { Session } from "neo4j-driver";
import {
  Game,
  GraphRecord,
  NodeRelationship,
  ScoreComponentConfig,
  Stat,
} from "../../types/schema";
import { mapByIdentity } from "../../util/nodefunctions";
import { isEmpty, isNil } from "lodash";

export async function getMod(session: Session, modName: string) {
  const query = "MATCH (mod:Mod) {name: $modname} RETURN mod";

  try {
    const mod = session.run(query, {
      modName,
    });
    console.log(`Fetched mod ${modName} successfully.`);
    return mod;
  } catch (error) {
    console.error(`Failed to fetch mod ${modName}`, error);
  }
}

export async function getModsChildren(session: Session, modName: string) {
  const query = `MATCH (mod:Mod {name: $modName})-[creates:CREATES]->(game:Game)
   OPTIONAL MATCH (mod:Mod  {name: $modName})-[creates:CREATES]->(config:ComponentConfig)
   OPTIONAL MATCH (config:ComponentConfig)-[contains:CONTAINS]->(stat:Stat)
   RETURN mod, collect(DISTINCT game) AS games, 
          collect(DISTINCT config) AS configs, 
          collect(DISTINCT stat) AS stats,
          collect(DISTINCT defines) AS containsRels`;

  try {
    const result = await session.run(query, {
      modName,
    });

    if (isNil(result) || isEmpty(result.records)) {
      return {};
    }

    const games = result.records[0].get("games");
    const configs = mapByIdentity<ScoreComponentConfig>(
      result.records[0].get("configs") as GraphRecord<ScoreComponentConfig>[],
    );

    const stats = result.records[0].get("stats");
    const configDefines = result.records[0].get("containsRels");
    ``;
    configDefines.forEach((rel: NodeRelationship) => {
      const configId = rel.start;
      const statId = rel.end;
      const stat = stats.find((s: GraphRecord<Stat>) => s.identity === statId);
      if (stat) {
        const config = configs.get(configId);
        if (config) {
          if (isNil(config.stats)) {
            config.stats = [];
          }
          config.stats.push({
            ...stat.properties,
            identity: stat.identity,
            elementId: stat.elementId,
          });
        }
      }
    });
    const flatGames = games.map((g: GraphRecord<Game>) => ({
      ...g.properties,
      identity: g.identity,
    }));

    const flatConfigs = games.map((c: GraphRecord<ScoreComponentConfig>) => ({
      ...c.properties,
      identity: c.identity,
    }));

    flatGames[0].configs = Array.from(configs.values());
    return (
      result.records[0].get("mod").properties,
      {
        games: flatGames,
        components: flatConfigs,
      }
    );
  } catch (error) {
    console.error(`Failed to fetch mod ${modName} and it's children`, error);
  }
}

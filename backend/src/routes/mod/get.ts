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
   OPTIONAL MATCH (game)-[creates:CREATES]->(config:ScoreComponentConfig)
   OPTIONAL MATCH (config)-[defines:DEFINES]->(stat:Stat)
   RETURN mod, collect(DISTINCT game) AS games, 
          collect(DISTINCT config) AS configs, 
          collect(DISTINCT stat) AS stats,
          collect(Distinct creates) as creates,
          collect(DISTINCT contains) AS containsRels,
          collect(DISTINCT defines) AS definesRels`;

  try {
    const result = await session.run(query, {
      modName,
    });

    if (isNil(result) || isEmpty(result.records)) {
      return {};
    }

    // TODO: replace with methods when multiple games defined
    const games = result.records[0].get("games");
    const configs = mapByIdentity<ScoreComponentConfig>(
      result.records[0].get("configs") as GraphRecord<ScoreComponentConfig>[],
    );
    const stats = result.records[0].get("stats");
    const configDefines = result.records[0].get("definesRels");
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
    flatGames[0].configs = Array.from(configs.values());
    return (
      result.records[0].get("mod").properties,
      {
        games: flatGames,
      }
    );
  } catch (error) {
    console.error(`Failed to fetch mod ${modName} and it's children`, error);
  }
}

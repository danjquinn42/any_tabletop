import { Session } from "neo4j-driver";
import {
  Game,
  GraphRecord,
  Mod,
  ScoreComponentConfig,
  Stat,
} from "../../types/schema";
import { RootNodeResponse } from "../../types/response";
import { keyBy } from "lodash";

export async function getInitialStateFromUserRoot(
  session: Session,
  userId: string,
) {
  const getRoot = `
        MATCH (user:User { id: $userId })-[entry:ENTRY]->(root:Root)
        MATCH (root:Root)-[has:HAS]->(mod:Mod)
        RETURN root, mod as entryMod
    `;

  const getMods = `
        MATCH (startMod:Mod {id: $modId})
        OPTIONAL MATCH path=(startMod)-[:OVERRIDES*0..]->(modChain:Mod)
        RETURN [mod in nodes(path) | mod] AS mods
  `;

  const getGames = `
      MATCH (mod:Mod { id: $modId})-[has:HAS]->(game:Game)
      RETURN collect(DISTINCT game) as games
  `;

  const getConfigs = `
    MATCH (mod:Mod { id: $modId })-[creates:CREATES]->(componentConfig:ComponentConfig)
    RETURN collect(DISTINCT componentConfig) as componentConfigs
  `;

  const getStats = `
    MATCH (c:ScoreComponentConfig { id: $configId })-[CONTAINS]->(stat:Stat)
    RETURN collect(DISTINCT stat) as stats
  `;

  try {
    return session.executeRead(async (transaction) => {
      const response: RootNodeResponse = {};
      const rootResult = await transaction.run(getRoot, { userId });

      const root = rootResult.records[0].get("root").properties;
      const entryMod = rootResult.records[0].get("entryMod");
      root.entryModId = entryMod.properties.id;

      const modResult = await transaction.run(getMods, {
        modId: root.entryModId,
      });
      const modList: Mod[] = modResult.records[0]
        .get("mods")
        .map((m: GraphRecord<Mod>) => m.properties);

      const gameList: Game[] = [];
      for (const mod of modList) {
        // It would be better to fetch all games in a single query but for now this is more readable
        const gamesResult = await transaction.run(getGames, { modId: mod.id });
        const games = gamesResult.records[0]
          .get("games")
          .map((g: GraphRecord<Game>) => g.properties);
        mod.gameIds = games.map((g: Game) => g.id);
        gameList.push(...games);
      }

      // TODO: Update when multiple mods are created
      // this only fetches configs from entry mod
      const configResult = await transaction.run(getConfigs, {
        modId: root.entryModId,
      });
      console.log("config record", configResult.records[0]);
      const componentList = configResult.records[0]
        .get("componentConfigs")
        .map((s: GraphRecord<ScoreComponentConfig>) => s.properties);

      console.log("Fetched Components", componentList);

      const statList: Stat[] = [];
      for (const comp of componentList) {
        const statResult = await transaction.run(getStats, {
          configId: comp.id,
        });
        const stats = statResult.records[0]
          .get("stats")
          .map((s: GraphRecord<Stat>) => s.properties);
        comp.statIds = stats.map((s: Stat) => s.id);
        componentList.push(...stats);
      }

      response.root = root;
      response.mods = keyBy(modList, "id");
      response.games = keyBy(gameList, "id");
      response.components = keyBy(componentList, "id");
      response.stats = keyBy(statList, "id");

      return response;
    });
  } catch (error) {
    console.error("Failed to get initial state:", error);
  }
}

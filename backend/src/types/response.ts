// this is a wrapper for sending the initial state to the FE
import { Game, Mod, ScoreComponentConfig, Stat } from "./schema";

interface ResponseItem<T> {
  [id: string]: T;
}

export interface RootNodeResponse {
  mods?: ResponseItem<Mod>;
  games?: ResponseItem<Game>;
  components?: ResponseItem<ScoreComponentConfig>;
  stats?: ResponseItem<Stat>;
}

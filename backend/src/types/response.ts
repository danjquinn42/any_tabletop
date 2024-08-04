// this is a wrapper for sending the initial state to the FE
import { Game, Mod, Root, ScoreComponentConfig, Stat } from "./schema";

interface ResponseItem<T> {
  [id: string]: T;
}

export interface RootNodeResponse {
  root?: Root;
  mods?: ResponseItem<Mod>;
  games?: ResponseItem<Game>;
  components?: ResponseItem<ScoreComponentConfig>;
  stats?: ResponseItem<Stat>;
}

import { Node } from "../types";

export function mapByIdentity<T extends Node>(nodes: T[]) {
  return new Map(
    nodes.map((n) => [
      n.identity,
      {
        ...n.properties,
        identity: n.identity,
      },
    ]),
  );
}

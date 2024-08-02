import { GraphNode } from "../types/schema";

export function mapByIdentity<T>(nodes: GraphNode<T>[]) {
  return new Map(
    nodes.map((n) => [
      n.identity,
      {
        ...n.properties,
        identity: n.identity,
        label: n.labels[0],
      },
    ]),
  );
}

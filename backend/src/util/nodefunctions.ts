import { GraphNode } from "../../types/schema";

export function mapByIdentity<T extends GraphNode>(nodes: T[]) {
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

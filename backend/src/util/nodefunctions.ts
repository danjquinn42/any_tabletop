import { GraphRecord } from "../types/schema";

export function mapByIdentity<T>(nodes: GraphRecord<T>[]) {
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

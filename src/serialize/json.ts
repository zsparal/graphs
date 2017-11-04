import { Dict } from "graph.interface";
import { Graph } from "graph";

interface SerializedGraph {
  nodes: Dict<string>;
  edges: Array<{ source: string; target: string; value: string }>;
}

export function serialize<N, E>(
  graph: Graph<N, E>,
  serializeNode: (node: N) => string = JSON.stringify,
  serializeEdge: (edge: E) => string = JSON.stringify
): string {
  return JSON.stringify(
    {
      nodes: graph.nodes.map(n => serializeNode(n.value)).toJS(),
      edges: graph.edges
        .map((value, { source, target }) => ({
          source,
          target,
          value: serializeEdge(value)
        }))
        .toList()
        .toArray()
    },
    null,
    2
  );
}

export function deserialize<N, E>(
  json: string,
  deserializeNode: (node: string) => N = JSON.parse,
  deserializeEdge: (edge: string) => E = JSON.parse
): Graph<N, E> {
  const serializedGraph: SerializedGraph = JSON.parse(json);
  return Graph.from(
    Object.entries(serializedGraph.nodes).map<[string, N]>(([id, value]) => [
      id,
      deserializeNode(value)
    ]),
    serializedGraph.edges.map<[string, string, E]>(({ source, target, value }) => [
      source,
      target,
      deserializeEdge(value)
    ])
  );
}

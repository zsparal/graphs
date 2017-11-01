import { Graph } from "graph";
import { Dict, NodeIndex } from "graph.interface";
import { Option } from "util/option";

export interface BellmanFordResult {
  predecessor: Dict<string | undefined>;
  distance: Dict<number>;
}

export function bellmanFord<N, E>(
  graph: Graph<N, E>,
  start: NodeIndex,
  weightSelector: (edge: E) => number
): Option<BellmanFordResult> {
  const predecessor: Dict<string | undefined> = {};
  const distance: Dict<number> = {};

  for (const node of graph.nodes.keys()) {
    distance[node] = Infinity;
  }

  distance[start] = 0;
  for (let i = 0; i < graph.nodeCount; i++) {
    let madeChanges = false;
    for (const [{ source, target }, data] of graph.edges) {
      const weight = weightSelector(data);
      if (distance[source] + weight < distance[target]) {
        distance[target] = distance[source] + weight;
        predecessor[target] = source;
        madeChanges = true;
      }
    }
    if (!madeChanges) {
      break;
    }
  }

  for (const [{ source, target }, data] of graph.edges) {
    const weight = weightSelector(data);
    if (distance[source] + weight < distance[target]) {
      return Option.none();
    }
  }

  return Option.some({ predecessor, distance });
}

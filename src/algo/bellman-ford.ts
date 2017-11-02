import { Graph } from "graph";
import { Dict, NodeIndex } from "graph.interface";

import { ShortestPathResult } from "algo/shortest-path";
import { createDistanceMap } from "algo/util";

export function bellmanFord<N, E>(
  graph: Graph<N, E>,
  start: NodeIndex,
  weightSelector: (edge: E) => number
): ShortestPathResult | undefined {
  const predecessor: Dict<string | undefined> = {};
  const distance = createDistanceMap(graph);

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
      return undefined;
    }
  }

  return { predecessor, distance };
}

import { Graph } from "graph";
import { Dict, NodeIndex } from "graph.interface";

import { ShortestPathResult } from "algo/shortest-path";
import { PriorityQueue } from "util/priority-queue";

export function dijkstra<N, E>(
  graph: Graph<N, E>,
  start: NodeIndex,
  weightSelector: (edge: E) => number
): ShortestPathResult | undefined {
  const predecessor: Dict<string | undefined> = {};
  const distance: Dict<number> = {};
  for (const node of graph.nodes.keys()) {
    distance[node] = Infinity;
  }

  distance[start] = 0;
  const queue = PriorityQueue.from<[string, number]>([[start, 0]], (a, b) => a[1] < b[1]);
  while (queue.length > 0) {
    const u = queue.popMin()[0];
    for (const v of graph.successors(u)) {
      const weight = weightSelector(graph.edgeValue(u, v)!);
      if (weight < 0) {
        return undefined;
      }

      if (distance[u] + weight < distance[v]) {
        distance[v] = distance[u] + weight;
        queue.push([v, distance[v]]);
      }
    }
  }
  return { distance, predecessor };
}

import { Graph } from "graph";
import { Dict, NodeIndex } from "graph.interface";
import { reconstructPath } from "algo/util";

export interface ShortestPathResult {
  predecessor: Dict<string | undefined>;
  distance: Dict<number>;
}

export type ShortestPathAlgorithm<N, E> = (
  graph: Graph<N, E>,
  start: NodeIndex,
  weightSelector: (edge: E) => number
) => ShortestPathResult | undefined;

export function shortestPathBetween<N, E>(
  graph: Graph<N, E>,
  algorithm: ShortestPathAlgorithm<N, E>,
  from: NodeIndex,
  to: NodeIndex,
  weightSelector: (edge: E) => number
): NodeIndex[] | undefined {
  const result = algorithm(graph, from, weightSelector);
  if (!result || !Number.isFinite(result.distance[to])) {
    return undefined;
  }

  return reconstructPath(to, result.predecessor);
}

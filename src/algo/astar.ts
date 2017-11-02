import { Graph } from "graph";
import { Dict, NodeIndex } from "graph.interface";
import { createDistanceMap, reconstructPath } from "algo/util";

export function astar<N, E>(
  graph: Graph<N, E>,
  start: NodeIndex,
  goal: NodeIndex,
  weight: (edge: E) => number,
  heuristic: (from: NodeIndex, to: NodeIndex) => number
): NodeIndex[] | undefined {
  const closed = new Set<NodeIndex>();
  const open = new Set<NodeIndex>([start]);
  const predecessor: Dict<NodeIndex | undefined> = {};

  const g = createDistanceMap(graph);
  g[start] = 0;

  const f = createDistanceMap(graph);
  f[start] = heuristic(start, goal);

  while (open.size > 0) {
    const current = popMin()!;
    if (current === goal) {
      return reconstructPath(goal, predecessor);
    }

    open.delete(current);
    closed.add(current);

    for (const successor of graph.successors(current)) {
      if (closed.has(successor)) {
        continue;
      }

      if (!open.has(successor)) {
        open.add(successor);
      }

      const score = g[current] + weight(graph.edgeValue(current, successor)!);
      if (score >= g[successor]) {
        continue;
      }

      predecessor[successor] = current;
      g[successor] = score;
      f[successor] = score + heuristic(successor, goal);
    }
  }

  return undefined;

  function popMin() {
    let minNode: NodeIndex | undefined;
    let minScore: number | undefined;
    for (const node of open) {
      const score = f[node];
      if (minScore == null || minNode == null || score < minScore) {
        minNode = node;
        minScore = score;
      }
    }
    return minNode;
  }
}

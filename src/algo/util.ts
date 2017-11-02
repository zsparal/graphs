import { Graph } from "graph";
import { Dict, NodeIndex } from "graph.interface";

export function createDistanceMap<N, E>(graph: Graph<N, E>): Dict<number> {
  const distanceMap: Dict<number> = {};
  for (const node of graph.nodes.keys()) {
    distanceMap[node] = Infinity;
  }
  return distanceMap;
}

export function reconstructPath(
  node: NodeIndex,
  predecessors: Dict<NodeIndex | undefined>
): NodeIndex[] {
  const path: NodeIndex[] = [];
  while (true) {
    const next = predecessors[node];
    if (next == null) {
      break;
    }
    path.push(node);
    node = next;
  }
  path.push(node);
  return path.reverse();
}

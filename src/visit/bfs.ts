import { Graph } from "graph";
import { NodeIndex } from "graph.interface";
import { Visitor } from "visit";

export function bfs<N, E>(graph: Graph<N, E>, startNode: NodeIndex, visitor: Visitor) {
  if (!graph.nodes.has(startNode)) {
    return;
  }

  const visited = new Set<string>();
  const queue = [startNode];
  while (queue.length > 0) {
    const [node] = queue.splice(0, 1);
    if (visited.has(node)) {
      continue;
    }

    visited.add(node);
    visitor(node);
    for (const successor of graph.successors(node)) {
      if (!visited.has(successor)) {
        queue.push(successor);
      }
    }
  }
}

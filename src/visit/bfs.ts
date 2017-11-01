import { NodeIndex, Visitable } from "graph.interface";
import { Visitor } from "visit";

export function bfs(graph: Visitable, startNode: NodeIndex, visitor: Visitor) {
  if (!graph.hasNode(startNode)) {
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
    queue.push(...graph.successors(node));
  }
}

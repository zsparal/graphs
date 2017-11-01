import { NodeIndex, Visitable } from "graph.interface";
import { Visitor } from "visit";

export function dfs(graph: Visitable, startNode: NodeIndex, visitor: Visitor) {
  if (!graph.hasNode(startNode)) {
    return;
  }

  const visited = new Set<string>();
  const stack = [startNode];
  while (stack.length > 0) {
    const node = stack.pop()!;
    if (visited.has(node)) {
      continue;
    }

    visited.add(node);
    visitor(node);
    stack.push(...graph.successors(node));
  }
}

export function dfsPostOrder(graph: Visitable, startNode: NodeIndex, visitor: Visitor) {
  if (!graph.hasNode(startNode)) {
    return;
  }

  const stack = [startNode];
  const visited = new Set<string>();
  const finished = new Set<string>();

  while (stack.length > 0) {
    const next = stack[stack.length - 1];
    if (!visited.has(next)) {
      visited.add(next);
      for (const successor of graph.successors(next)) {
        if (!visited.has(successor)) {
          stack.push(successor);
        }
      }
    } else {
      const node = stack.pop()!;
      if (!finished.has(node)) {
        finished.add(node);
        visitor(node);
      }
    }
  }
}

import { Graph } from "graph";
import { Visitor } from "visit";

export function dfs<TN, TE>(
  graph: Graph<TN, TE>,
  start: string,
  visitor: Visitor<TN>
) {
  if (!graph.hasNode(start)) {
    return;
  }

  const stack = [start];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const nodeId = stack.pop()!;
    if (visited.has(nodeId)) {
      continue;
    }
    const node = graph.getNodeData(nodeId)!;
    visitor(node);
    visited.add(nodeId);
    graph.walkDirectedNeighbors(nodeId, "outgoing", neighbor => {
      stack.push(neighbor);
    });
  }
}

export function dfsPostOrder<TN, TE>(
  graph: Graph<TN, TE>,
  start: string,
  visitor: Visitor<TN>
) {
  if (!graph.hasNode(start)) {
    return;
  }

  const stack = [start];
  const visited = new Set<string>();
  const finished: string[] = [];

  while (stack.length > 0) {
    const nodeId = stack.pop()!;
    if (visited.has(nodeId)) {
      continue;
    }

    visited.add(nodeId);
    finished.push(nodeId);
    graph.walkDirectedNeighbors(nodeId, "outgoing", neighbor => {
      stack.push(neighbor);
    });
  }

  while (finished.length > 0) {
    const node = finished.pop()!;
    visitor(graph.getNodeData(node)!);
  }
}

import { Graph } from "graph";
import { Visitor } from "visit";

export function bfs<TN, TE>(
  graph: Graph<TN, TE>,
  start: string,
  visitor: Visitor<TN>
) {
  if (!graph.hasNode(start)) {
    return;
  }

  const queue = [start];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const [nodeId] = queue.splice(0, 1);
    if (visited.has(nodeId)) {
      continue;
    }
    const node = graph.getNodeData(nodeId)!;
    visitor(node);
    visited.add(nodeId);
    graph.walkDirectedNeighbors(nodeId, "outgoing", neighbor => {
      queue.push(neighbor);
    });
  }
}

import { NodeIndex, Visitable } from "graph.interface";

export type Visitor = (node: NodeIndex) => void;

export function recordTraversal(
  graph: Visitable,
  traversal: (graph: Visitable, startNode: NodeIndex, visitor: Visitor) => void,
  startNode: NodeIndex
): string[] {
  const result: string[] = [];
  traversal(graph, startNode, node => result.push(node));
  return result;
}

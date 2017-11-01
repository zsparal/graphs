import { Graph } from "graph";
import { NodeIndex } from "graph.interface";

export type Visitor = (node: NodeIndex) => void;

export function recordTraversal<N, E>(
  graph: Graph<N, E>,
  traversal: (graph: Graph<N, E>, startNode: NodeIndex, visitor: Visitor) => void,
  startNode: NodeIndex
): string[] {
  const result: string[] = [];
  traversal(graph, startNode, node => result.push(node));
  return result;
}

import { NodeIndex, Visitable } from "graph.interface";
import { Graph } from "graph";

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

export function reduce<N, E, R>(
  graph: Graph<N, E>,
  traversal: (graph: Visitable, startNode: NodeIndex, visitor: Visitor) => void,
  startNode: NodeIndex,
  reducer: (accumulator: R, node: N) => R,
  initialValue: R
): R {
  const nodeIndices = recordTraversal(graph, traversal, startNode);

  let acc = initialValue;
  for (const index of nodeIndices) {
    acc = reducer(acc, graph.nodeValue(index)!);
  }
  return acc;
}

export function reduce1<N, E>(
  graph: Graph<N, E>,
  traversal: (graph: Visitable, startNode: NodeIndex, visitor: Visitor) => void,
  startNode: NodeIndex,
  reducer: (accumulator: N, node: N) => N
): N {
  const nodeIndices = recordTraversal(graph, traversal, startNode);

  let acc = graph.nodeValue(nodeIndices[0])!;
  for (let i = 1; i < nodeIndices.length; i++) {
    acc = reducer(acc, graph.nodeValue(nodeIndices[i])!);
  }
  return acc;
}

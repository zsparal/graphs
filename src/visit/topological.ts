import { NodeIndex, Visitable } from "graph.interface";
import { Visitor } from "visit";

import { recordTraversal } from "visit";
import { dfsPostOrder } from "visit/dfs";

export function topological(graph: Visitable, startNode: NodeIndex, visitor: Visitor) {
  if (!graph.hasNode(startNode)) {
    return;
  }

  const nodes = recordTraversal(graph, dfsPostOrder, startNode).reverse();
  for (const node of nodes) {
    visitor(node);
  }
}

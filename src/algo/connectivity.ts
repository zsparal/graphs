import { Graph } from "graph";
import { NodeIndex } from "graph.interface";

import { recordTraversal } from "visit";
import { dfs } from "visit/dfs";
import { undirected } from "visit/undirected";

export function getReachableNodes<N, E>(graph: Graph<N, E>, from: NodeIndex): NodeIndex[] {
  return recordTraversal(undirected(graph), dfs, from);
}

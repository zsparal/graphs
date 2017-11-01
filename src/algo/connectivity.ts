import { Graph } from "graph";
import { NodeIndex } from "graph.interface";

import { recordTraversal } from "visit";
import { dfs } from "visit/dfs";
import { undirected } from "visit/undirected";

export function getReachableNodes<N, E>(graph: Graph<N, E>, from: NodeIndex): NodeIndex[] {
  return recordTraversal(undirected(graph), dfs, from);
}

export function getWeaklyConnectedComponents<N, E>(graph: Graph<N, E>): NodeIndex[][] {
  const components: NodeIndex[][] = [];
  const visited = new Set<NodeIndex>();

  for (const node of graph.nodes.keys()) {
    if (visited.has(node)) {
      continue;
    }

    const component = getReachableNodes(graph, node);
    components.push(component);
    for (const c of component) {
      visited.add(c);
    }
  }

  return components;
}

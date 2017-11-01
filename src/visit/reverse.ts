import { List } from "immutable";

import { Graph } from "graph";
import { Visitable } from "graph.interface";

export class ReverseGraph<N, E> implements Visitable {
  constructor(private graph: Graph<N, E>) {}

  hasNode(node: string): boolean {
    return this.graph.hasNode(node);
  }

  successors(node: string): List<string> {
    return this.graph.predecessors(node);
  }
}

export function reverse<N, E>(graph: Graph<N, E>): Visitable {
  return new ReverseGraph(graph);
}

import { Graph } from "graph";
import { Dict, NodeIndex } from "graph.interface";

const enum Color {
  White,
  Gray,
  Black
}

export function isCyclic<N, E>(graph: Graph<N, E>): boolean {
  const color: Dict<Color> = {};
  for (const node of graph.nodes.keys()) {
    color[node] = Color.White;
  }

  for (const node of graph.nodes.keys()) {
    if (color[node] === Color.White) {
      if (cycleHelper(node)) {
        return true;
      }
    }
  }

  return false;

  function cycleHelper(node: NodeIndex): boolean {
    color[node] = Color.Gray;
    for (const successor of graph.successors(node)) {
      if (color[successor] === Color.Gray) {
        return true;
      }

      if (color[successor] === Color.White && cycleHelper(successor)) {
        return true;
      }
    }

    color[node] = Color.Black;
    return false;
  }
}

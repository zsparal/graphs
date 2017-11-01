import { Graph } from "graph";
import { Dict, NodeIndex } from "graph.interface";
import { Option } from "util/option";

export function sortTopological<N, E>(graph: Graph<N, E>): Option<NodeIndex[]> {
  const inputCounts: Dict<number> = {};
  for (const [id, node] of graph.nodes) {
    inputCounts[id] = node.incomingEdges.size;
  }

  const sorted: NodeIndex[] = [];
  const ready = [...graph.sources()];

  while (ready.length > 0) {
    const node = ready.pop()!;
    sorted.push(node);

    for (const successor of graph.successors(node)) {
      inputCounts[successor] -= 1;

      if (inputCounts[successor] === 0) {
        ready.push(successor);
      }
    }
  }

  return sorted.length === graph.nodeCount ? Option.some(sorted) : Option.none();
}

import { Graph } from "graph";
import { NodeIndex } from "graph.interface";
import { Option } from "util/option";

export function sortTopological<N, E>(graph: Graph<N, E>): Option<NodeIndex[]> {
  const inputCounts = new Map(
    graph.nodes.map<[string, number]>((value, key) => [key, value.incomingEdges.size]).values()
  );

  const sorted: NodeIndex[] = [];
  const ready = [...graph.sources()];

  while (ready.length > 0) {
    const node = ready.pop()!;
    sorted.push(node);

    for (const successor of graph.successors(node)) {
      const newCount = inputCounts.get(successor)! - 1;
      inputCounts.set(successor, newCount);

      if (newCount === 0) {
        ready.push(successor);
      }
    }
  }

  return sorted.length === graph.nodeCount ? Option.some(sorted) : Option.none();
}

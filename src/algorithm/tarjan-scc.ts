import { Graph, Node } from "graph";

export function tarjanScc<TN, TE>(graph: Graph<TN, TE>): Array<Array<string>> {
  const components: Array<Array<string>> = [];

  const stack: string[] = [];
  const nodeIndex = new Map<string, number>();
  const lowlink = new Map<string, number>();
  const onStack = new Set<string>();
  let index = 0;

  function strongConnect(node: Node<TN, TE>) {
    lowlink.set(node.id, index);
    nodeIndex.set(node.id, index);
    stack.push(node.id);
    onStack.add(node.id);

    index += 1;

    for (const edge of node.outgoingEdges.values()) {
      if (!nodeIndex.has(edge.nodes.to)) {
        strongConnect(graph.getNode(edge.nodes.to)!);
        lowlink.set(
          node.id,
          Math.min(lowlink.get(node.id)!, lowlink.get(edge.nodes.to)!)
        );
      } else if (onStack.has(edge.nodes.to)) {
        lowlink.set(
          node.id,
          Math.min(lowlink.get(node.id)!, nodeIndex.get(edge.nodes.to)!)
        );
      }
    }

    if (lowlink.get(node.id) === nodeIndex.get(node.id)) {
      const component: string[] = [];
      let other: string;
      do {
        other = stack.pop()!;
        onStack.delete(other);
        component.push(other);
      } while (node.id !== other);
      components.push(component);
    }
  }

  for (const [nodeId, node] of graph.nodes) {
    if (!nodeIndex.has(nodeId)) {
      strongConnect(node);
    }
  }

  return components;
}

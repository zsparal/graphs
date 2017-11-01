import { Map, OrderedMap, OrderedSet, Record, Set, List } from "immutable";

import { NodeIndex } from "graph.interface";
import { Option } from "util/option";

export class Node<N, E> extends Record<{
  value: N;
  incomingEdges: OrderedSet<NodeIndex>;
  outgoingEdges: OrderedMap<NodeIndex, E>;
}>({
  value: undefined!,
  incomingEdges: OrderedSet(),
  outgoingEdges: OrderedMap()
}) {}

export class Graph<N, E> extends Record<{
  nodes: OrderedMap<NodeIndex, Node<N, E>>;
}>({
  nodes: OrderedMap()
}) {
  get nodeCount() {
    return this.nodes.size;
  }

  get edgeCount() {
    return this.nodes.reduce((acc, edge) => acc + edge.outgoingEdges.size, 0);
  }

  sources(): Set<NodeIndex> {
    return this.nodes
      .filter(node => node.incomingEdges.size === 0)
      .keySeq()
      .toSet();
  }

  sinks(): Set<NodeIndex> {
    return this.nodes
      .filter(node => node.outgoingEdges.size === 0)
      .keySeq()
      .toSet();
  }

  nodeValue(id: NodeIndex): Option<N> {
    return Option.from(this.nodes.getIn([id, "value"]));
  }

  hasNode(id: NodeIndex): boolean {
    return this.nodes.has(id);
  }

  addNode(id: NodeIndex, value: N): Graph<N, E> {
    if (this.hasNode(id)) {
      throw new Error(`Cannot add duplicate node ${id}`);
    }
    return this.setIn(["nodes", id], new Node({ value }));
  }

  updateNode(id: NodeIndex, value: N): Graph<N, E> {
    return this.setIn(["nodes", id], new Node({ value }));
  }

  removeNode(id: NodeIndex): Graph<N, E> {
    const node = this.nodes.get(id);
    if (!node) {
      return this;
    }

    return this.removeIn(["nodes", id]).update("nodes", nodes =>
      this.removeRelatedEdges(id, node, nodes)
    );
  }

  edgeValue(from: NodeIndex, to: NodeIndex): Option<E> {
    return Option.from(this.nodes.getIn([from, "outgoingEdges", to]));
  }

  hasEdge(from: NodeIndex, to: NodeIndex): boolean {
    return this.nodes.hasIn([from, "outgoingEdges", to]);
  }

  addEdge(from: NodeIndex, to: NodeIndex, data: E): Graph<N, E> {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);
    if (!fromNode || !toNode) {
      throw new Error(`Cannot add edge between ${from} and ${to}. One of the edges does not exist`);
    }
    if (fromNode.outgoingEdges.has(to)) {
      throw new Error(`Cannot add duplicate edge between ${from} and ${to}`);
    }

    return this.setIn(["nodes", from, "outgoingEdges", to], data).updateIn(
      ["nodes", to, "incomingEdges"],
      (edges: Set<NodeIndex>) => edges.add(from)
    );
  }

  updateEdge(from: NodeIndex, to: NodeIndex, data: E): Graph<N, E> {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);
    if (!fromNode || !toNode) {
      throw new Error(`Cannot add edge between ${from} and ${to}. One of the edges does not exist`);
    }

    return this.setIn(["nodes", from, "outgoingEdges", to], data).updateIn(
      ["nodes", to, "incomingEdges"],
      (edges: Set<NodeIndex>) => edges.add(from)
    );
  }

  removeEdge(from: NodeIndex, to: NodeIndex): Graph<N, E> {
    if (!this.hasNode(from) || !this.hasNode(to)) {
      return this;
    }

    return this.removeIn(["nodes", from, "outgoingEdges", to]).removeIn([
      "nodes",
      to,
      "incomingEdges",
      from
    ]);
  }

  successors(nodeIndex: NodeIndex): List<NodeIndex> {
    const node = this.nodes.get(nodeIndex);
    if (!node) {
      return List();
    }
    return node.outgoingEdges.keySeq().toList();
  }

  predecessors(nodeIndex: NodeIndex): List<NodeIndex> {
    const node = this.nodes.get(nodeIndex);
    if (!node) {
      return List();
    }
    return node.incomingEdges.keySeq().toList();
  }

  neighbors(nodeIndex: NodeIndex): List<NodeIndex> {
    const node = this.nodes.get(nodeIndex);
    if (!node) {
      return List();
    }
    return node.incomingEdges
      .concat(node.outgoingEdges.keySeq())
      .toSet()
      .toList();
  }

  private removeRelatedEdges(
    nodeId: NodeIndex,
    node: Node<N, E>,
    nodes: Map<NodeIndex, Node<N, E>>
  ): Map<NodeIndex, Node<N, E>> {
    for (const incomingNode of node.incomingEdges) {
      nodes = nodes.updateIn([incomingNode, "outgoingEdges"], (n: Map<NodeIndex, E>) =>
        n.remove(nodeId)
      );
    }

    for (const outgoingNode of node.outgoingEdges.keys()) {
      nodes = nodes.updateIn([outgoingNode, "incomingEdges"], (n: Set<NodeIndex>) =>
        n.remove(nodeId)
      );
    }

    return nodes;
  }
}

import { List, OrderedMap, Record } from "immutable";

import { Edge, NodeIndex } from "graph.interface";

export class Node<N> extends Record<{
  value: N;
  incomingEdges: List<NodeIndex>;
  outgoingEdges: List<NodeIndex>;
}>({
  value: undefined!,
  incomingEdges: List(),
  outgoingEdges: List()
}) {}

export class Graph<N, E> extends Record<{
  nodes: OrderedMap<NodeIndex, Node<N>>;
  edges: OrderedMap<Edge, E>;
}>({
  nodes: OrderedMap(),
  edges: OrderedMap()
}) {
  static from<N, E>(nodes: Array<[string, N]>, edges?: Array<[string, string, E]>): Graph<N, E> {
    let graph = new Graph<N, E>();
    for (const [node, data] of nodes) {
      graph = graph.addNode(node, data);
    }
    if (edges) {
      for (const [from, to, data] of edges) {
        graph = graph.addEdge(from, to, data);
      }
    }
    return graph;
  }

  get nodeCount() {
    return this.nodes.size;
  }

  get edgeCount() {
    return this.edges.size;
  }

  sources(): NodeIndex[] {
    return Array.from(this.nodes.filter(node => node.incomingEdges.size === 0).keys());
  }

  sinks(): NodeIndex[] {
    return Array.from(this.nodes.filter(node => node.outgoingEdges.size === 0).keys());
  }

  nodeValue(id: NodeIndex): N | undefined {
    return this.nodes.getIn([id, "value"]);
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

    return this.removeIn(["nodes", id]).removeRelatedEdges(id, node);
  }

  edgeValue(from: NodeIndex, to: NodeIndex): E | undefined {
    return this.edges.get(new Edge(from, to));
  }

  hasEdge(from: NodeIndex, to: NodeIndex): boolean {
    return this.edges.has(new Edge(from, to));
  }

  addEdge(from: NodeIndex, to: NodeIndex, data: E): Graph<N, E> {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);
    if (!fromNode || !toNode) {
      throw new Error(`Cannot add edge between ${from} and ${to}. One of the nodes does not exist`);
    }

    const edge = new Edge(from, to);
    if (this.edges.has(edge)) {
      throw new Error(`Cannot add duplicate edge between ${from} and ${to}`);
    }

    return this.withMutations(graph => {
      const nodes = this.addNodeEdge(graph.nodes, from, to);
      return graph.set("nodes", nodes).set("edges", graph.edges.set(edge, data));
    });
  }

  updateEdge(from: NodeIndex, to: NodeIndex, data: E): Graph<N, E> {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);
    if (!fromNode || !toNode) {
      throw new Error(`Cannot add edge between ${from} and ${to}. One of the nodes does not exist`);
    }

    const edge = new Edge(from, to);
    return this.withMutations(graph => {
      if (!this.edges.has(edge)) {
        graph = graph.set("nodes", this.addNodeEdge(graph.nodes, from, to));
      }
      return graph.set("edges", graph.edges.set(edge, data));
    });
  }

  removeEdge(from: NodeIndex, to: NodeIndex): Graph<N, E> {
    const edge = new Edge(from, to);
    if (!this.edges.has(edge)) {
      return this;
    }

    return this.withMutations(graph => {
      graph = graph.set(
        "nodes",
        graph.nodes.withMutations(nodes => {
          nodes = this.removeNodeEdge(nodes, from, "outgoingEdges", to);
          return this.removeNodeEdge(nodes, to, "incomingEdges", from);
        })
      );
      return graph.set("edges", graph.edges.remove(edge));
    });
  }

  successors(nodeIndex: NodeIndex): List<NodeIndex> {
    const node = this.nodes.get(nodeIndex);
    if (!node) {
      return List();
    }
    return node.outgoingEdges;
  }

  predecessors(nodeIndex: NodeIndex): List<NodeIndex> {
    const node = this.nodes.get(nodeIndex);
    if (!node) {
      return List();
    }
    return node.incomingEdges;
  }

  neighbors(nodeIndex: NodeIndex): List<NodeIndex> {
    const node = this.nodes.get(nodeIndex);
    if (!node) {
      return List();
    }
    return node.incomingEdges.concat(node.outgoingEdges).toList();
  }

  private removeRelatedEdges(nodeId: NodeIndex, node: Node<N>): Graph<N, E> {
    const nodes = this.nodes.withMutations(ns => {
      for (const edge of node.incomingEdges) {
        ns = this.removeNodeEdge(ns, edge, "outgoingEdges", nodeId);
      }
      for (const edge of node.outgoingEdges) {
        ns = this.removeNodeEdge(ns, edge, "incomingEdges", nodeId);
      }
      return ns;
    });

    const incomingEdges = node.incomingEdges.toSeq().map(from => new Edge(from, nodeId));
    const outgoingEdges = node.outgoingEdges.toSeq().map(to => new Edge(nodeId, to));
    const edges = this.edges.removeAll(incomingEdges.concat(outgoingEdges));

    return this.withMutations(graph => graph.set("nodes", nodes).set("edges", edges));
  }

  private addNodeEdge(
    nodes: OrderedMap<NodeIndex, Node<N>>,
    from: NodeIndex,
    to: NodeIndex
  ): OrderedMap<NodeIndex, Node<N>> {
    return nodes.withMutations(ns => {
      ns
        .updateIn([from, "outgoingEdges"], (edges: List<NodeIndex>) => edges.push(to))
        .updateIn([to, "incomingEdges"], (edges: List<NodeIndex>) => edges.push(from));
    });
  }

  private removeNodeEdge(
    nodes: OrderedMap<NodeIndex, Node<N>>,
    node: NodeIndex,
    type: "incomingEdges" | "outgoingEdges",
    edge: NodeIndex
  ): OrderedMap<NodeIndex, Node<N>> {
    return nodes.updateIn([node, type], (edges: List<NodeIndex>) => edges.filter(e => e !== edge));
  }
}

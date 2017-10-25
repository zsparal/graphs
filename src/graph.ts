import { IndexGenerator, SequentialIndexGenerator } from "index-generator";

export type GraphType = "directed" | "undirected";
export type GraphEdgeType = "multi" | "simple";
export type EdgeDirection = "incoming" | "outgoing";
export type NeighborVisitor = (neighbor: string) => void;

export interface Edge<TE> {
  data: TE;
  nodes: { from: string; to: string };
}

export interface Node<TN, TE> {
  id: string;
  data: TN;
  incomingEdges: Set<string>;
  outgoingEdges: Map<string, Edge<TE>>;
}

export interface GraphOptions {
  type: GraphType;
  edgeType: GraphEdgeType;
  indexGenerator: IndexGenerator;
}

const defaultOptions = {
  type: "directed" as "directed",
  edgeType: "multi" as "multi"
};

export class Graph<TN = {}, TE = {}> {
  private type: GraphType;
  private edgeType: GraphEdgeType;
  private indexGenerator: IndexGenerator;

  private nodeList = new Map<string, Node<TN, TE>>();

  constructor(options: Partial<GraphOptions> = defaultOptions) {
    const actualOptions = { ...defaultOptions, ...options };
    this.type = actualOptions.type;
    this.indexGenerator =
      actualOptions.indexGenerator || new SequentialIndexGenerator();
  }

  get isDirected() {
    return this.type === "directed";
  }

  get nodes(): Map<string, Node<TN, TE>> {
    return this.nodeList;
  }

  getNode(id: string): Node<TN, TE> | undefined {
    return this.nodeList.get(id);
  }

  sources(): string[] {
    const sources: string[] = [];
    for (const node of this.nodeList.values()) {
      if (
        node.incomingEdges.size === 0 &&
        (this.type === "directed" || node.outgoingEdges.size === 0)
      ) {
        sources.push(node.id);
      }
    }
    return sources;
  }

  sinks(): string[] {
    const sinks: string[] = [];
    for (const node of this.nodeList.values()) {
      if (
        node.outgoingEdges.size === 0 &&
        (this.type === "directed" || node.outgoingEdges.size === 0)
      ) {
        sinks.push(node.id);
      }
    }
    return sinks;
  }

  getNodeData(id: string): TN | undefined {
    const node = this.getNode(id);
    return node && node.data;
  }

  hasNode(id: string): boolean {
    return !!this.nodeList.get(id);
  }

  addNode(data: TN): string {
    const id = this.indexGenerator.next();
    this.nodeList.set(id, {
      id,
      data,
      incomingEdges: new Set(),
      outgoingEdges: new Map()
    });
    return id;
  }

  updateNode(id: string, data: TN) {
    const node = this.getNode(id);
    if (!node) {
      return;
    }
    node.data = data;
  }

  removeNode(id: string) {
    const node = this.nodeList.get(id);
    if (node && this.nodeList.delete(id)) {
      for (const edgeFrom of node.incomingEdges) {
        this.removeEdge(edgeFrom, id);
      }

      for (const edgeTo of node.outgoingEdges.keys()) {
        this.removeEdge(id, edgeTo);
      }
    }
  }

  getEdgeData(from: string, to: string): TE | undefined {
    const fromNode = this.nodeList.get(from);
    if (!fromNode) {
      return undefined;
    }

    const edge = fromNode.outgoingEdges.get(to);
    return edge && edge.data;
  }

  hasEdge(from: string, to: string): boolean {
    const node = this.nodeList.get(from);
    return node != null && node.outgoingEdges.has(to);
  }

  addEdge(from: string, to: string, data: TE): boolean {
    if (this.edgeType === "simple" && this.hasEdge(from, to)) {
      return false;
    }

    const fromNode = this.nodeList.get(from);
    const toNode = this.nodeList.get(to);
    if (!fromNode || !toNode) {
      return false;
    }

    fromNode.outgoingEdges.set(to, { data, nodes: { from, to } });
    toNode.incomingEdges.add(from);
    return true;
  }

  updateEdge(from: string, to: string, data: TE) {
    const fromNode = this.nodeList.get(from);
    const toNode = this.nodeList.get(to);
    if (!fromNode || !toNode) {
      return;
    }

    const updatedEdge = fromNode.outgoingEdges.get(to) || {
      data,
      nodes: { from, to }
    };
    fromNode.outgoingEdges.set(to, updatedEdge);
    toNode.incomingEdges.add(from);
  }

  removeEdge(from: string, to: string) {
    if (this.hasEdge(from, to)) {
      const fromNode = this.nodeList.get(from)!;
      const toNode = this.nodeList.get(to)!;

      fromNode.outgoingEdges.delete(to);
      toNode.incomingEdges.delete(from);
    }
  }

  neighbors(id: string): string[] | undefined {
    const node = this.getNodeData(id);
    if (!node) {
      return undefined;
    }

    const neighbors: string[] = [];
    this.walkNeighbors(id, neighbor => neighbors.push(neighbor));
    return neighbors;
  }

  walkNeighbors(id: string, visitor: NeighborVisitor) {
    const node = this.getNode(id);
    if (!node) {
      return;
    }

    if (this.type === "undirected") {
      for (const edge of node.incomingEdges.keys()) {
        visitor(edge);
      }
    }

    for (const edge of node.outgoingEdges.keys()) {
      visitor(edge);
    }
  }

  directedNeighbors(
    id: string,
    direction: EdgeDirection
  ): string[] | undefined {
    const node = this.getNodeData(id);
    if (!node) {
      return undefined;
    }

    const neighbors: string[] = [];
    this.walkDirectedNeighbors(id, direction, neighbor =>
      neighbors.push(neighbor)
    );
    return neighbors;
  }

  walkDirectedNeighbors(
    id: string,
    direction: EdgeDirection,
    visitor: NeighborVisitor
  ) {
    const node = this.getNode(id);
    if (!node) {
      return;
    }

    if (this.type === "undirected" || direction === "incoming") {
      for (const edge of node.incomingEdges.keys()) {
        visitor(edge);
      }
    }

    if (this.type === "undirected" || direction === "outgoing") {
      for (const edge of node.outgoingEdges.keys()) {
        visitor(edge);
      }
    }
  }
}

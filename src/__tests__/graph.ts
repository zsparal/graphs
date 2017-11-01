import { List } from "immutable";

import { Graph } from "../graph";

const n = ["n0", "n1", "n2", "n3", "n4"];

describe("Graph", () => {
  let graph: Graph<number, number>;
  describe("Basic node operations", () => {
    beforeEach(() => {
      graph = new Graph();
    });

    it("can add nodes (via addNode)", () => {
      graph = graph.addNode(n[0], 10);
      expect(graph.nodeValue(n[0]).unwrap()).toBe(10);
    });

    it("can get node data", () => {
      graph = graph.addNode(n[0], 10);
      expect(graph.nodeValue(n[0]).unwrap()).toBe(10);
      expect(graph.nodeValue(n[1]).isNone()).toBe(true);
    });

    it("can add nodes (via updateNode)", () => {
      graph = graph.updateNode(n[0], 10);
      expect(graph.nodeValue(n[0]).unwrap()).toBe(10);
    });

    it("throws on duplicate nodes", () => {
      graph = graph.addNode(n[0], 10);
      expect(() => graph.addNode(n[0], 20)).toThrow();
    });

    it("can update nodes", () => {
      graph = graph.addNode(n[0], 10).updateNode(n[0], 20);
      expect(graph.nodeValue(n[0]).unwrap()).toBe(20);
    });

    it("can remove nodes", () => {
      graph = graph
        .addNode(n[0], 10)
        .addNode(n[1], 20)
        .removeNode(n[0]);
      expect(graph.hasNode(n[0])).toBe(false);
      expect(graph.hasNode(n[1])).toBe(true);
    });

    it("can check if a node exists", () => {
      graph = graph.addNode(n[0], 10);
      expect(graph.hasNode(n[0])).toBe(true);
      expect(graph.hasNode(n[1])).toBe(false);
    });
  });

  describe("Basic edge operations", () => {
    beforeEach(() => {
      graph = Graph.from([[n[0], 0], [n[1], 1], [n[2], 2], [n[3], 3]]);
    });

    it("can add edges (via addEdge)", () => {
      graph = graph.addEdge(n[0], n[1], 10);
      expect(graph.edgeValue(n[0], n[1]).unwrap()).toBe(10);
    });

    it("can get edge data", () => {
      graph = graph.addEdge(n[0], n[1], 10);
      expect(graph.edgeValue(n[0], n[1]).unwrap()).toBe(10);
      expect(graph.edgeValue(n[1], n[2]).isNone()).toBe(true);
    });

    it("can add edges (via updateEdge)", () => {
      graph = graph.updateEdge(n[0], n[1], 10);
      expect(graph.edgeValue(n[0], n[1]).unwrap()).toBe(10);
    });

    it("throws on duplicate edges", () => {
      graph = graph.addEdge(n[0], n[1], 10);
      expect(() => graph.addEdge(n[0], n[1], 20)).toThrow();
    });

    it("can update edges", () => {
      graph = graph.addEdge(n[0], n[1], 10).updateEdge(n[0], n[1], 20);
      expect(graph.edgeValue(n[0], n[1]).unwrap()).toBe(20);
    });

    it("can remove edges", () => {
      graph = graph
        .addEdge(n[0], n[1], 10)
        .addEdge(n[1], n[2], 20)
        .removeEdge(n[0], n[1]);
      expect(graph.hasEdge(n[0], n[1])).toBe(false);
      expect(graph.hasEdge(n[1], n[2])).toBe(true);
    });

    it("can check if a node exists", () => {
      graph = graph.addEdge(n[0], n[1], 10);
      expect(graph.hasEdge(n[0], n[1])).toBe(true);
      expect(graph.hasEdge(n[1], n[2])).toBe(false);
    });
  });

  describe("Neighbor operations", () => {
    beforeEach(() => {
      graph = Graph.from(
        [[n[0], 0], [n[1], 1], [n[2], 2], [n[3], 3]],
        [[n[0], n[1], 10], [n[0], n[2], 20], [n[0], n[3], 30], [n[1], n[2], 40], [n[2], n[3], 60]]
      );
    });

    it("can get successors", () => {
      expect(graph.successors(n[0]).equals(List.of(n[1], n[2], n[3]))).toBe(true);
      expect(graph.successors(n[3]).equals(List())).toBe(true);
    });

    it("can get predecessors", () => {
      expect(graph.predecessors(n[0]).equals(List())).toBe(true);
      expect(graph.predecessors(n[3]).equals(List.of(n[0], n[2]))).toBe(true);
    });

    it("can get neighbors", () => {
      expect(graph.neighbors(n[1]).equals(List.of(n[0], n[2]))).toBe(true);
    });
  });
});

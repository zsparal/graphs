import { List } from "immutable";

import { Graph } from "../graph";

describe("Graph", () => {
  let graph: Graph<number, number>;
  describe("Basic node operations", () => {
    beforeEach(() => {
      graph = new Graph();
    });

    it("can add nodes (via addNode)", () => {
      graph = graph.addNode("A", 10);
      expect(graph.nodeValue("A").unwrap()).toBe(10);
    });

    it("can get node data", () => {
      graph = graph.addNode("A", 10);
      expect(graph.nodeValue("A").unwrap()).toBe(10);
      expect(graph.nodeValue("B").isNone()).toBe(true);
    });

    it("can add nodes (via updateNode)", () => {
      graph = graph.updateNode("A", 10);
      expect(graph.nodeValue("A").unwrap()).toBe(10);
    });

    it("throws on duplicate nodes", () => {
      graph = graph.addNode("A", 10);
      expect(() => graph.addNode("A", 20)).toThrow();
    });

    it("can update nodes", () => {
      graph = graph.addNode("A", 10).updateNode("A", 20);
      expect(graph.nodeValue("A").unwrap()).toBe(20);
    });

    it("can remove nodes", () => {
      graph = graph
        .addNode("A", 10)
        .addNode("B", 20)
        .removeNode("A");
      expect(graph.hasNode("A")).toBe(false);
      expect(graph.hasNode("B")).toBe(true);
    });

    it("can check if a node exists", () => {
      graph = graph.addNode("A", 10);
      expect(graph.hasNode("A")).toBe(true);
      expect(graph.hasNode("B")).toBe(false);
    });
  });

  describe("Basic edge operations", () => {
    beforeEach(() => {
      graph = Graph.from([["A", 0], ["B", 1], ["C", 2], ["D", 3]]);
    });

    it("can add edges (via addEdge)", () => {
      graph = graph.addEdge("A", "B", 10);
      expect(graph.edgeValue("A", "B").unwrap()).toBe(10);
    });

    it("can get edge data", () => {
      graph = graph.addEdge("A", "B", 10);
      expect(graph.edgeValue("A", "B").unwrap()).toBe(10);
      expect(graph.edgeValue("B", "C").isNone()).toBe(true);
    });

    it("can add edges (via updateEdge)", () => {
      graph = graph.updateEdge("A", "B", 10);
      expect(graph.edgeValue("A", "B").unwrap()).toBe(10);
    });

    it("throws on duplicate edges", () => {
      graph = graph.addEdge("A", "B", 10);
      expect(() => graph.addEdge("A", "B", 20)).toThrow();
    });

    it("can update edges", () => {
      graph = graph.addEdge("A", "B", 10).updateEdge("A", "B", 20);
      expect(graph.edgeValue("A", "B").unwrap()).toBe(20);
    });

    it("can remove edges", () => {
      graph = graph
        .addEdge("A", "B", 10)
        .addEdge("B", "C", 20)
        .removeEdge("A", "B");
      expect(graph.hasEdge("A", "B")).toBe(false);
      expect(graph.hasEdge("B", "C")).toBe(true);
    });

    it("can check if a node exists", () => {
      graph = graph.addEdge("A", "B", 10);
      expect(graph.hasEdge("A", "B")).toBe(true);
      expect(graph.hasEdge("B", "C")).toBe(false);
    });
  });

  describe("Neighbor operations", () => {
    beforeEach(() => {
      graph = Graph.from(
        [["A", 0], ["B", 1], ["C", 2], ["D", 3]],
        [["A", "B", 10], ["A", "C", 20], ["A", "D", 30], ["B", "C", 40], ["C", "D", 60]]
      );
    });

    it("can get successors", () => {
      expect(graph.successors("A").equals(List.of("B", "C", "D"))).toBe(true);
      expect(graph.successors("D").equals(List())).toBe(true);
    });

    it("can get predecessors", () => {
      expect(graph.predecessors("A").equals(List())).toBe(true);
      expect(graph.predecessors("D").equals(List.of("A", "C"))).toBe(true);
    });

    it("can get neighbors", () => {
      expect(graph.neighbors("B").equals(List.of("A", "C"))).toBe(true);
    });
  });
});

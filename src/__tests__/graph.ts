import { Graph } from "graph";

describe("Algorithms", () => {
  describe("Tarjan SCC", () => {
    let graph: Graph<number, number>;

    beforeEach(() => {
      graph = new Graph();
    });

    it("can add nodes", () => {
      const nodeId = graph.addNode(10);
      expect(graph.hasNode(nodeId)).toBe(true);
    });

    it("stores the correct data with the nodes", () => {
      const nodeOneId = graph.addNode(10);
      const nodeTwoId = graph.addNode(20);
      const nodeOne = graph.getNodeData(nodeOneId);
      const nodeTwo = graph.getNodeData(nodeTwoId);

      expect(nodeOne).toBe(10);
      expect(nodeTwo).toBe(20);
    });

    it("returns false if checking for a missing node with hasNode", () => {
      const hasDummy = graph.hasNode("DUMMY");
      expect(hasDummy).toBe(false);
    });

    it("returns undefined for missing nodes", () => {
      const node = graph.getNodeData("DUMMY");
      expect(node).toBeUndefined();
    });

    it("can remove a node", () => {
      const nodeId = graph.addNode(10);
      graph.removeNode(nodeId);
      expect(graph.getNodeData(nodeId)).toBeUndefined();
    });
  });
});

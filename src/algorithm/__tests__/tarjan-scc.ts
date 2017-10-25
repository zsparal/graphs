import { Graph } from "graph";
import { tarjanScc } from "algorithm";

describe("Algorithms", () => {
  describe("Tarjan SCC", () => {
    let graph: Graph<number, number>;
    let nodes: string[];

    beforeEach(() => {
      graph = new Graph();
      nodes = [
        graph.addNode(10),
        graph.addNode(20),
        graph.addNode(30),
        graph.addNode(40),
        graph.addNode(50)
      ];
    });

    it("correctly finds simple components", () => {
      graph.addEdge(nodes[0], nodes[1], 1);
      const components = tarjanScc(graph);

      for (const node of nodes) {
        expect(components).toContainEqual([node]);
      }
    });

    it("correctly finds a large component", () => {
      graph.addEdge(nodes[0], nodes[1], 1);
      graph.addEdge(nodes[1], nodes[2], 2);
      graph.addEdge(nodes[2], nodes[3], 3);
      graph.addEdge(nodes[3], nodes[4], 4);
      graph.addEdge(nodes[4], nodes[0], 5);

      const components = tarjanScc(graph);
      expect(components.map(a => a.sort())).toContainEqual(nodes.sort());
    });
  });
});

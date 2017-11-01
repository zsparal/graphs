import { Graph } from "graph";

import { dijkstra } from "algo/dijkstra";

describe("Dijkstra", () => {
  let graph: Graph<{}, number>;
  beforeEach(() => {
    graph = Graph.from(
      [["A", 0], ["B", 0], ["C", 0], ["D", 0], ["E", 0]],
      [
        ["A", "B", 10],
        ["A", "C", 3],
        ["B", "C", 1],
        ["B", "D", 2],
        ["C", "B", 4],
        ["C", "D", 8],
        ["C", "E", 2],
        ["D", "E", 7],
        ["E", "D", 9]
      ]
    );
  });

  it("returns the correct result for graphs without a negative cycle", () => {
    const expectedDistances = { A: 0, B: 7, C: 3, D: 9, E: 5 };
    const result = dijkstra(graph, "A", x => x);
    expect(result!.distance).toEqual(expectedDistances);
  });

  it("returns undefined for graphs with negative edges", () => {
    graph = graph.addEdge("E", "C", -10);
    const result = dijkstra(graph, "A", x => x);
    expect(result).toBeUndefined();
  });
});

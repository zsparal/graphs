import { Graph } from "graph";

import { bellmanFord } from "algo/bellman-ford";

describe("Bellman-Ford", () => {
  let graph: Graph<{}, number>;
  beforeEach(() => {
    graph = Graph.from(
      [["A", 0], ["B", 0], ["C", 0], ["D", 0], ["E", 0]],
      [
        ["A", "B", -1],
        ["A", "C", 4],
        ["B", "C", 3],
        ["B", "D", 2],
        ["B", "E", 2],
        ["D", "B", 1],
        ["D", "C", 5],
        ["E", "D", -3]
      ]
    );
  });

  it("returns the correct result for graphs without a negative cycle", () => {
    const expectedDistances = { A: 0, B: -1, C: 2, D: -2, E: 1 };
    const expectedPredecessors = { A: undefined, B: "A", C: "B", D: "E", E: "B" };
    const result = bellmanFord(graph, "A", x => x);
    expect(result.unwrap().distance).toEqual(expectedDistances);
    expect(result.unwrap().predecessor).toEqual(expectedPredecessors);
  });

  it("returns None for graphs with a negative cycle", () => {
    graph = graph.updateEdge("D", "C", -1);
    graph = graph.addEdge("C", "A", -2);
    expect(bellmanFord(graph, "A", x => x).isNone()).toEqual(true);
  });
});

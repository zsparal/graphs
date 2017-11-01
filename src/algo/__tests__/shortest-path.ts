import { Graph } from "graph";

import { bellmanFord } from "algo/bellman-ford";
import { shortestPathBetween } from "algo/shortest-path";

describe("Shortest path", () => {
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
    const path = shortestPathBetween(graph, bellmanFord, "A", "D", x => x);
    expect(path).toEqual(["A", "B", "E", "D"]);
  });

  it("returns undefined for graphs with a negative cycle", () => {
    graph = graph.updateEdge("D", "C", -1);
    graph = graph.addEdge("C", "A", -2);
    const path = shortestPathBetween(graph, bellmanFord, "A", "E", x => x);
    expect(path).toBeUndefined();
  });
});

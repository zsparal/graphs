import { Graph } from "graph";

import { astar } from "algo/astar";

describe("A*", () => {
  let graph: Graph<number, number>;
  beforeEach(() => {
    graph = Graph.from(
      [["A", 0], ["B", 4], ["C", 2], ["D", 4], ["E", 4.5], ["F", 2], ["G", 0]],
      [
        ["A", "B", 1.5],
        ["A", "E", 2],
        ["B", "C", 2],
        ["C", "D", 3],
        ["D", "G", 4],
        ["E", "F", 3],
        ["F", "G", 2]
      ]
    );
  });

  it("returns the correct path", () => {
    const result = astar(graph, "A", "G", e => e, from => graph.nodeValue(from)!);
    expect(result).toEqual(["A", "E", "F", "G"]);
  });
});

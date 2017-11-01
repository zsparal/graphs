import { Graph } from "graph";

import { tarjanScc } from "algo/scc";

describe("Tarjan SCC", () => {
  let graph: Graph<{}, number>;
  beforeEach(() => {
    graph = Graph.from(
      [["A", 0], ["B", 0], ["C", 0], ["D", 0], ["E", 0], ["F", 0], ["G", 0]],
      [
        ["A", "B", 1],
        ["B", "C", 1],
        ["C", "A", 1],
        ["C", "D", 1],
        ["D", "E", 1],
        ["E", "F", 1],
        ["F", "G", 1],
        ["G", "E", 1]
      ]
    );
  });

  it("finds the strongly connected components in a graph", () => {
    const result = tarjanScc(graph).map(a => a.sort());
    expect(result).toEqual([["E", "F", "G"], ["D"], ["A", "B", "C"]]);
  });
});

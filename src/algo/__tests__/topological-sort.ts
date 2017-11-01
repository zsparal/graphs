import { Graph } from "graph";

import { sortTopological } from "algo/topological-sort";

describe("Topological sort", () => {
  let graph: Graph<number, number>;
  beforeEach(() => {
    graph = Graph.from(
      [["A", 0], ["B", 0], ["C", 0], ["D", 0], ["E", 0]],
      [["A", "B", 0], ["A", "C", 0], ["B", "C", 0], ["C", "D", 0], ["D", "E", 0]]
    );
  });

  it("returns the correct topological order for acyclic graphs", () => {
    const expected = ["A", "B", "C", "D", "E"];
    expect(sortTopological(graph).unwrap()).toEqual(expected);
  });

  it("returns None for cyclic graphs", () => {
    graph = graph.addEdge("E", "A", 0);
    expect(sortTopological(graph).isNone()).toEqual(true);
  });
});

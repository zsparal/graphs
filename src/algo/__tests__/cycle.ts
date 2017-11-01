import { Graph } from "graph";

import { isCyclic } from "algo/cycle";

describe("Cycle detection", () => {
  let graph: Graph<number, number>;
  beforeEach(() => {
    graph = Graph.from(
      [["A", 0], ["B", 0], ["C", 0], ["D", 0], ["E", 0]],
      [["A", "B", 0], ["A", "C", 0], ["B", "C", 0], ["C", "D", 0], ["D", "E", 0]]
    );
  });

  it("returns false for empty graphs", () => {
    expect(isCyclic(new Graph())).toEqual(false);
  });

  it("returns false for acyclic graphs", () => {
    expect(isCyclic(graph)).toEqual(false);
  });

  it("returns None for cyclic graphs", () => {
    graph = graph.addEdge("E", "A", 0);
    expect(isCyclic(graph)).toEqual(true);
  });
});

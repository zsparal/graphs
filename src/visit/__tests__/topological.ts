import { Graph } from "graph";

import { recordTraversal } from "visit";
import { topological } from "visit/topological";

describe("Topological visit", () => {
  let graph: Graph<number, number>;
  beforeEach(() => {
    graph = Graph.from(
      [["A", 0], ["B", 0], ["C", 0], ["D", 0], ["E", 0]],
      [["A", "C", 0], ["C", "B", 0], ["B", "D", 0], ["C", "D", 0], ["D", "E", 0]]
    );
  });

  it("returns the correct topological order for acyclic graphs", () => {
    const expected = ["A", "C", "B", "D", "E"];
    expect(recordTraversal(graph, topological, "A")).toEqual(expected);
  });
});

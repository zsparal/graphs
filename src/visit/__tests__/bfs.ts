import { Graph } from "graph";

import { recordTraversal } from "visit";
import { bfs } from "visit/bfs";

describe("BFS", () => {
  let graph: Graph<number, number>;
  beforeEach(() => {
    graph = Graph.from(
      [["A", 0], ["B", 0], ["C", 0], ["D", 0], ["E", 0]],
      [["A", "B", 0], ["A", "C", 0], ["B", "C", 0], ["C", "D", 0], ["D", "E", 0]]
    );
  });

  it("returns the correct traversal for acyclic graphs", () => {
    const expected = ["A", "B", "C", "D", "E"];
    expect(recordTraversal(bfs, graph, "A")).toEqual(expected);
  });

  it("returns the correct traversal for cyclic graphs", () => {
    graph = graph.addEdge("E", "A", 0);
    const expected = ["A", "B", "C", "D", "E"];
    expect(recordTraversal(bfs, graph, "A")).toEqual(expected);
  });
});

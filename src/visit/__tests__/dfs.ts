import { Graph } from "graph";

import { recordTraversal } from "visit";
import { dfs, dfsPostOrder } from "visit/dfs";

describe("DFS", () => {
  let graph: Graph<number, number>;
  beforeEach(() => {
    graph = Graph.from(
      [["A", 0], ["B", 0], ["C", 0], ["D", 0], ["E", 0]],
      [["A", "B", 0], ["A", "C", 0], ["B", "C", 0], ["C", "D", 0], ["D", "E", 0]]
    );
  });

  it("returns the correct preorder traversal for acyclic graphs", () => {
    const expected = ["A", "C", "D", "E", "B"];
    expect(recordTraversal(dfs, graph, "A")).toEqual(expected);
  });

  it("returns the correct preorder traversal for cyclic graphs", () => {
    graph = graph.addEdge("E", "A", 0);
    const expected = ["A", "C", "D", "E", "B"];
    expect(recordTraversal(dfs, graph, "A")).toEqual(expected);
  });

  it("returns the correct postorder traversal for acyclic graphs", () => {
    const expected = ["E", "D", "C", "B", "A"];
    expect(recordTraversal(dfsPostOrder, graph, "A")).toEqual(expected);
  });

  it("returns the correct postorder traversal for cyclic graphs", () => {
    graph = graph.addEdge("E", "A", 0);
    const expected = ["E", "D", "C", "B", "A"];
    expect(recordTraversal(dfsPostOrder, graph, "A")).toEqual(expected);
  });
});

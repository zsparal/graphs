import { Graph } from "graph";

import { recordTraversal } from "visit";
import { dfs, dfsPostOrder } from "visit/dfs";

const n = ["n0", "n1", "n2", "n3", "n4"];

describe("DFS", () => {
  let graph: Graph<number, number>;
  beforeEach(() => {
    graph = Graph.from(
      [[n[0], 0], [n[1], 0], [n[2], 0], [n[3], 0], [n[4], 0]],
      [[n[0], n[1], 0], [n[0], n[2], 0], [n[1], n[2], 0], [n[2], n[3], 0], [n[3], n[4], 0]]
    );
  });

  it("returns the correct preorder traversal for acyclic graphs", () => {
    const expected = [n[0], n[2], n[3], n[4], n[1]];
    expect(recordTraversal(dfs, graph, n[0])).toEqual(expected);
  });

  it("returns the correct preorder traversal for cyclic graphs", () => {
    graph = graph.addEdge(n[4], n[0], 0);
    const expected = [n[0], n[2], n[3], n[4], n[1]];
    expect(recordTraversal(dfs, graph, n[0])).toEqual(expected);
  });

  it("returns the correct postorder traversal for acyclic graphs", () => {
    const expected = [n[4], n[3], n[2], n[1], n[0]];
    expect(recordTraversal(dfsPostOrder, graph, n[0])).toEqual(expected);
  });

  it("returns the correct postorder traversal for cyclic graphs", () => {
    graph = graph.addEdge(n[4], n[0], 0);
    const expected = [n[4], n[3], n[2], n[1], n[0]];
    expect(recordTraversal(dfsPostOrder, graph, n[0])).toEqual(expected);
  });
});

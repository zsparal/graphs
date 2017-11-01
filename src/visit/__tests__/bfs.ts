import { Graph } from "graph";

import { recordTraversal } from "visit";
import { bfs } from "visit/bfs";

const n = ["n0", "n1", "n2", "n3", "n4"];

describe("BFS", () => {
  let graph: Graph<number, number>;
  beforeEach(() => {
    graph = Graph.from(
      [[n[0], 0], [n[1], 0], [n[2], 0], [n[3], 0], [n[4], 0]],
      [[n[0], n[1], 0], [n[0], n[2], 0], [n[1], n[2], 0], [n[2], n[3], 0], [n[3], n[4], 0]]
    );
  });

  it("returns the correct traversal for acyclic graphs", () => {
    const expected = [n[0], n[1], n[2], n[3], n[4]];
    expect(recordTraversal(bfs, graph, n[0])).toEqual(expected);
  });

  it("returns the correct traversal for cyclic graphs", () => {
    graph = graph.addEdge(n[4], n[0], 0);
    const expected = [n[0], n[1], n[2], n[3], n[4]];
    expect(recordTraversal(bfs, graph, n[0])).toEqual(expected);
  });
});

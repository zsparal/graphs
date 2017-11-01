import { Graph } from "graph";

import { sortTopological } from "algo/topological-sort";

const n = ["n0", "n1", "n2", "n3", "n4"];

describe("Topological sort", () => {
  let graph: Graph<number, number>;
  beforeEach(() => {
    graph = new Graph<number, number>()
      .addNode(n[0], 0)
      .addNode(n[1], 0)
      .addNode(n[2], 0)
      .addNode(n[3], 0)
      .addNode(n[4], 0)
      .addEdge(n[0], n[1], 0)
      .addEdge(n[0], n[2], 0)
      .addEdge(n[1], n[2], 0)
      .addEdge(n[2], n[3], 0)
      .addEdge(n[3], n[4], 0);
  });

  it("returns the correct topological order for acyclic graphs", () => {
    const expected = [n[0], n[1], n[2], n[3], n[4]];
    expect(sortTopological(graph).unwrap()).toEqual(expected);
  });

  it("returns None for cyclic graphs", () => {
    graph = graph.addEdge(n[4], n[0], 0);
    expect(sortTopological(graph).isNone()).toEqual(true);
  });
});

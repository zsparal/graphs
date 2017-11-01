import { Graph } from "graph";

import { sortTopological } from "algo/topological-sort";

const n = ["n0", "n1", "n2", "n3", "n4"];

describe("Topological sort", () => {
  let graph: Graph<number, number>;
  beforeEach(() => {
    graph = Graph.from(
      [[n[0], 0], [n[1], 0], [n[2], 0], [n[3], 0], [n[4], 0]],
      [[n[0], n[1], 0], [n[0], n[2], 0], [n[1], n[2], 0], [n[2], n[3], 0], [n[3], n[4], 0]]
    );
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

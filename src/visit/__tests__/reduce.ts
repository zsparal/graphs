import { Graph } from "graph";

import { reduce, reduce1 } from "visit";
import { bfs } from "visit/bfs";

describe("Reduce", () => {
  let graph: Graph<number, number>;
  beforeEach(() => {
    graph = Graph.from(
      [["A", 1], ["B", 2], ["C", 3], ["D", 4], ["E", 5]],
      [["A", "B", 0], ["A", "C", 0], ["B", "C", 0], ["C", "D", 0], ["D", "E", 0]]
    );
  });

  it("produces the correct sum with an initial element", () => {
    expect(reduce(graph, bfs, "A", (sum, n) => sum + n, 0)).toEqual(15);
  });

  it("handles complex reducers", () => {
    const expected = [1, 2, 3, 4, 5];
    expect(reduce(graph, bfs, "A", (values, n) => [...values, n], [] as number[])).toEqual(
      expected
    );
  });

  it("produces the correct sum without an initial element", () => {
    expect(reduce1(graph, bfs, "A", (sum, n) => sum + n)).toEqual(15);
  });
});

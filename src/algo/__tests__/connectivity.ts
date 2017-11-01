import { Graph } from "graph";

import { getReachableNodes, getWeaklyConnectedComponents } from "algo/connectivity";

describe("Connectivity", () => {
  let graph: Graph<number, number>;
  beforeEach(() => {
    graph = Graph.from(
      [["A", 0], ["B", 0], ["C", 0], ["D", 0], ["E", 0], ["F", 0], ["G", 0]],
      [["A", "B", 0], ["A", "C", 0], ["B", "C", 0], ["C", "D", 0], ["D", "E", 0]]
    );
  });

  it("returns the all reachable nodes from a node", () => {
    const expected = ["A", "B", "C", "D", "E"];
    const result = getReachableNodes(graph, "E").sort();
    expect(result).toEqual(expected);
  });

  it("returns an isolated node", () => {
    const expected = ["F"];
    const result = getReachableNodes(graph, "F").sort();
    expect(result).toEqual(expected);
  });

  it("returns all weakly connected components", () => {
    const expected = [["A", "B", "C", "D", "E"], ["F"], ["G"]];
    const result = getWeaklyConnectedComponents(graph).map(c => c.sort());
    expect(result).toEqual(expected);
  });
});

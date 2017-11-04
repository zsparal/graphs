import { is } from "immutable";

import { Graph } from "graph";
import { serialize, deserialize } from "../json";

describe("JSON", () => {
  let graph: Graph<{}, number>;
  beforeEach(() => {
    graph = Graph.from(
      [["A", 0], ["B", 0], ["C", 0], ["D", 0], ["E", 0]],
      [
        ["A", "B", -1],
        ["A", "C", 4],
        ["B", "C", 3],
        ["B", "D", 2],
        ["B", "E", 2],
        ["D", "B", 1],
        ["D", "C", 5],
        ["E", "D", -3]
      ]
    );
  });

  it("serializes/deserializes correctly", () => {
    expect(is(graph, deserialize(serialize(graph)))).toBe(true);
  });
});

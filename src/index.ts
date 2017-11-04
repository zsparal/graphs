import { Graph } from "./graph";
import { serialize } from "serialize/dot";

let graph = Graph.from(
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

console.log(serialize("bellman-ford", graph));

debugger;

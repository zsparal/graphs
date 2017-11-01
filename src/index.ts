import { Map } from "immutable";

import { Edge } from "./graph.interface";

const a = Map()
  .set(new Edge("1", "2"), 10)
  .has(new Edge("1", "2"));

console.log(a);
debugger;

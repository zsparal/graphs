import { Graph } from "graph";

export function serialize<N, E>(name: string, graph: Graph<N, E>) {
  const edges = graph.edges
    .keySeq()
    .map(({ source, target }) => `  ${source} -> ${target}`)
    .join(";\n");

  return `digraph ${name} {\n${edges}\n}`;
}

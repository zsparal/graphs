import { Graph } from "graph";
import { tarjanScc } from "./tarjan-scc";

export function detectCycle<TN, TE>(
  graph: Graph<TN, TE>
): string[] | undefined {
  const components = tarjanScc(graph);
  for (const component of components) {
    if (component.length > 1) {
      return component;
    }
  }
  return undefined;
}

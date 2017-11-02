import { Graph } from "graph";
import { Dict, NodeIndex } from "graph.interface";

export function tarjanScc<N, E>(graph: Graph<N, E>): NodeIndex[][] {
  const components: NodeIndex[][] = [];
  const nodeCount = graph.nodeCount;

  let cnt = 0;
  let scnt = 0;
  const pre: Dict<number> = {};
  const low: Dict<number> = {};
  const S: NodeIndex[] = [];

  for (const node of graph.nodes.keys()) {
    pre[node] = low[node] = -1;
  }

  for (const node of graph.nodes.keys()) {
    if (pre[node] === -1) {
      scc(node);
    }
  }

  return components;

  function scc(w: NodeIndex) {
    let min = (low[w] = pre[w] = cnt++);
    S.push(w);

    for (const t of graph.successors(w)) {
      if (pre[t] === -1) {
        scc(t);
      }
      if (low[t] < min) {
        min = low[t];
      }
    }

    if (min < low[w]) {
      low[w] = min;
      return;
    }

    let t: string;
    if (!components[scnt]) {
      components.push([]);
    }
    do {
      t = S.pop()!;
      components[scnt].push(t);
      low[t] = nodeCount;
    } while (t !== w);

    scnt += 1;
  }
}

export function kosarajuScc<N, E>(graph: Graph<N, E>): NodeIndex[][] {
  const visited = new Set<NodeIndex>();
  const L: NodeIndex[] = [];
  const ids: Dict<NodeIndex> = {};

  for (const node of graph.nodes.keys()) {
    visit(node);
  }

  for (const node of graph.nodes.keys()) {
    assign(node, node);
  }

  return Object.values(
    Object.entries(ids).reduce(
      (components, [node, component]) => {
        components[component] = components[component] || [];
        components[component].push(node);
        return components;
      },
      {} as Dict<NodeIndex[]>
    )
  );

  function visit(u: NodeIndex) {
    if (visited.has(u)) {
      return;
    }

    visited.add(u);
    for (const v of graph.successors(u)) {
      visit(v);
    }
    L.push(u);
  }

  function assign(u: NodeIndex, root: NodeIndex) {
    if (!ids[u]) {
      ids[u] = root;
      for (const v of graph.predecessors(u)) {
        assign(v, root);
      }
    }
  }
}

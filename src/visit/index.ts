export { bfs } from "./bfs";
export { dfs, dfsPostOrder } from "./dfs";

export type Visitor<TN> = (node: TN) => void;

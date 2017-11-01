import { hash, List, ValueObject } from "immutable";

export type NodeIndex = string;
export interface Dict<T> {
  [key: string]: T;
}

export interface Visitable {
  hasNode(node: NodeIndex): boolean;
  successors(node: NodeIndex): List<NodeIndex>;
}

export class Edge implements ValueObject {
  constructor(public source: NodeIndex, public target: NodeIndex) {}

  equals(other: Edge): boolean {
    return this.source === other.source && this.target === other.target;
  }

  hashCode(): number {
    let result = 17;
    result = result * 37 + hash(this.source);
    result = result * 37 + hash(this.target);
    return result;
  }
}

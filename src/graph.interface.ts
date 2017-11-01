import { hash, ValueObject } from "immutable";

export type NodeIndex = string;

export class Edge implements ValueObject {
  constructor(public from: NodeIndex, public to: NodeIndex) {}

  equals(other: Edge): boolean {
    return this.from === other.from && this.to === other.to;
  }

  hashCode(): number {
    let result = 17;
    result = result * 37 + hash(this.from);
    result = result * 37 + hash(this.to);
    return result;
  }
}

export interface IndexGenerator {
  next(): string;
}

export class SequentialIndexGenerator implements IndexGenerator {
  private current: number;
  constructor(start = 0) {
    this.current = start;
  }

  next(): string {
    const ret = this.current;
    this.current += 1;
    return ret.toString();
  }
}

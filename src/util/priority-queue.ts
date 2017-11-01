export type Comparator<T> = (a: T, b: T) => boolean;

export class PriorityQueue<T> {
  static from<T>(iter: Iterable<T>, compare: Comparator<T> = (a, b) => a < b): PriorityQueue<T> {
    return new PriorityQueue(iter, compare);
  }

  private data: T[];
  private size: number;
  private compare: Comparator<T>;

  constructor(iter: Iterable<T>, compare?: Comparator<T>);
  constructor(compare?: Comparator<T>);
  constructor(iterOrCompare?: Comparator<T> | Iterable<T>, compare?: Comparator<T>) {
    if (!iterOrCompare || typeof iterOrCompare === "function") {
      this.compare = iterOrCompare || ((a, b) => a < b);
      this.data = [undefined!];
      this.size = 0;
    } else {
      const array = Array.from(iterOrCompare);
      this.compare = compare || ((a, b) => a < b);
      this.data = [undefined! as T].concat(array);
      this.size = array.length;

      for (let i = Math.floor(array.length / 2); i > 0; i--) {
        this.siftDown(i);
      }
    }
  }

  get length() {
    return this.size;
  }

  push(item: T) {
    this.data.push(item);
    this.size += 1;
    this.siftUp(this.size);
  }

  popMin(): T {
    const ret = this.data[1];
    this.data[1] = this.data[this.size];
    this.size -= 1;
    this.data.pop();
    this.siftDown(1);
    return ret;
  }

  private siftUp(child: number) {
    while (true) {
      const parent = Math.floor(child / 2);
      if (parent <= 0) {
        break;
      }
      if (this.compare(this.data[child], this.data[parent])) {
        const tmp = this.data[parent];
        this.data[parent] = this.data[child];
        this.data[child] = tmp;
      }
      child = parent;
    }
  }

  private siftDown(i: number) {
    while (i * 2 <= this.size) {
      const min = this.minChild(i);
      if (this.compare(this.data[min], this.data[i])) {
        const tmp = this.data[i];
        this.data[i] = this.data[min];
        this.data[min] = tmp;
      }
      i = min;
    }
  }

  private minChild(parent: number) {
    const firstChild = parent * 2;
    if (firstChild + 1 > this.size) {
      return firstChild;
    } else {
      return this.compare(this.data[firstChild], this.data[firstChild + 1])
        ? firstChild
        : firstChild + 1;
    }
  }
}

import { PriorityQueue } from "util/priority-queue";

describe("Priority queue", () => {
  it("works", () => {
    const queue = PriorityQueue.from([4, 2, 5, 7, 1]);
    queue.push(10);
    queue.push(-1);

    expect(queue.popMin()).toBe(-1);
    expect(queue.popMin()).toBe(1);
    expect(queue.popMin()).toBe(2);
    expect(queue.popMin()).toBe(4);
    expect(queue.popMin()).toBe(5);
    expect(queue.popMin()).toBe(7);
    expect(queue.popMin()).toBe(10);
  });
});

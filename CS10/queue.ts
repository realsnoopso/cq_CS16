import { Queue, ProcessId } from './types';

export const queue: Queue = {
  arr: [],
  enqueue: (id: ProcessId) => {
    queue.arr.push(id);
    return queue.arr;
  },
  dequeue: () => {
    const id = queue.arr.shift();
    return id;
  },
};

// todo: dequeue 속도 떨어지는 것 개선

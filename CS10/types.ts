import { Process } from './process';

export type ProcessId = string;
export type ProcessStatus = 'ready' | 'waiting' | 'running' | 'terminated';

export type Program = {
  processes: Process[];
  queue: Queue;
  running: ProcessId | null;
  cumulativeTime: number;
  totalTime: number;

  generateProcess: () => void;
  updateCumulativeTime: (time: number) => void;
};

export type Queue = {
  arr: ProcessId[];
  enqueue: (id: ProcessId) => ProcessId[];
  dequeue: () => ProcessId | undefined;
};

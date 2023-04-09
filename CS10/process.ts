import { generateNum, generateId } from './utils';
import { Program, ProcessId, ProcessStatus } from './types';
import { Worker } from 'worker_threads';

export class Process {
  #id: ProcessId;
  #current: number;
  #total: number | any;
  #waiting: number;
  #excuted: number;
  #status: ProcessStatus | null;
  #thread: number;

  constructor(processes: Process[]) {
    this.#id = generateId();
    this.#current = 0;
    this.#total = 0;
    this.#waiting = 0;
    this.#excuted = 0;
    this.#status = 'ready';
    this.#thread = 0;

    const totals = processes.map((process: Process) => process.#total);
    const num = generateNum(totals);
    if (num) this.#total = num;
  }

  setThread(process: Process) {
    this.#thread = Math.floor(process.getTotal() / 2);
  }

  getCurrent() {
    return this.#current;
  }

  getTotal() {
    return this.#total;
  }

  getId() {
    return this.#id;
  }

  getStatus() {
    return this.#status;
  }

  getRemainTime() {
    return this.#total - this.#current;
  }

  isFinished() {
    return this.#current >= this.#total;
  }

  updateStatus(value: ProcessStatus) {
    this.#status = value;
  }

  addWaiting() {
    this.#waiting++;
  }

  addExcuted() {
    this.#excuted++;
  }

  addCurrent(time: number) {
    this.#current += time;
  }

  getThreads() {
    return this.#thread;
  }

  getInfo() {
    return {
      id: this.#id,
      current: this.#current,
      total: this.#total,
      waiting: this.#waiting,
      excuted: this.#excuted,
      status: this.#status,
      thread: this.#thread,
    };
  }
}

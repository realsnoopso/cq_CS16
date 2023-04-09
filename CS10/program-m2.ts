import { Worker } from 'worker_threads';
import { Program } from './types';
import { queue } from './queue';
import { Process } from './process';
import {
  printThread,
  runProcessWithThread,
  printResultWithThread,
  updateDataWithThreadAfterRun,
} from './program-runThread';
import {
  resetRunning,
  updatedataBeforeRun,
  getProcess,
  terminateProcess,
} from './program-runProcess';
import { INTERVAL_THREAD } from './constants';

let INTERVAL_Id: any = null;

const program: Program = {
  processes: [],
  queue: queue,
  running: null,
  cumulativeTime: 0,
  totalTime: 0,

  generateProcess: () => {
    const process = new Process(program.processes);
    process.setThread(process);
    program.processes.push(process);
    program.queue.enqueue(process.getId());
  },
  updateCumulativeTime: (time: number) => {
    program.cumulativeTime += time;
  },
};

const ready = () => {
  program.generateProcess();
  program.generateProcess();
  program.generateProcess();
  printThread(program);
};

const run = async () => {
  resetRunning(program);
  const targetId = program.queue.dequeue();
  if (targetId) {
    const process = getProcess(program, targetId);
    updatedataBeforeRun(program, process);
    const processTime = await runProcessWithThread(program, process);
    processTime && updateDataWithThreadAfterRun(process, processTime);
    if (process.isFinished()) {
      return terminateProcess(program, process);
    }
    return program.queue.enqueue(process.getId());
  }
  printResultWithThread(INTERVAL_Id);
};

const display = () => {
  program.processes.forEach((process) => {
    const { id, current, total, status } = process.getInfo();
    console.log(`${id}(${status}), ${current} / ${total}sec `);
  });
  console.log('.');
};

export const runScheduleWithThread = async () => {
  ready();

  INTERVAL_Id = setInterval(async () => {
    display();
    await run();
  }, INTERVAL_THREAD);
};

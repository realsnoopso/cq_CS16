import { Program } from './types';
import { Process } from './process';
import { queue } from './queue';
import {
  resetRunning,
  printResult,
  runProcess,
  getProcess,
  updatedataBeforeRun,
  updateDataAfterRun,
  terminateProcess,
} from './program-runProcess';
import { INTERVAL } from './constants';

let INTERVAL_Id: any = null;

const program: Program = {
  processes: [],
  queue: queue,
  running: null,
  cumulativeTime: 0,
  totalTime: 0,

  generateProcess: () => {
    const process = new Process(program.processes);
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
};

const run = async () => {
  resetRunning(program);
  const targetId = program.queue.dequeue();
  if (targetId) {
    const process = getProcess(program, targetId);
    updatedataBeforeRun(program, process);
    await runProcess();
    updateDataAfterRun(program, process);
    if (process.isFinished()) {
      return terminateProcess(program, process);
    }
    return program.queue.enqueue(targetId);
  }
  printResult(program, INTERVAL_Id);
};

const display = () => {
  program.processes.forEach((process) => {
    const { id, current, total, status, waiting } = process.getInfo();
    console.log(
      `${id}(${status}), ${current} / ${total}sec , waiting ${waiting} sec`
    );
  });
  console.log('.');
};

export const runSchedule = () => {
  ready();
  INTERVAL_Id = setInterval(async () => {
    display();
    await run();
  }, INTERVAL);
};

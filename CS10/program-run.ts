import { Program, ProcessId } from './types';
import { Process } from './process';
import { INTERVAL, RUN_TIME, DECIMAL_PLACE } from './constants';

export const findProcess = (program: Program, id: ProcessId) =>
  program.processes.findIndex((process) => process.getId() === id);

export const setRunning = (program: Program, process: Process) => {
  program.running = process.getId();
  process.updateStatus('running');
};

export const setWaiting = (program: Program) => {
  program.processes.forEach((process) => {
    if (program.running !== process.getId()) {
      process.updateStatus('waiting');
    }
  });
};

export const resetRunning = (program: Program) => {
  if (program.running) {
    program.processes[findProcess(program, program.running)].updateStatus(
      'waiting'
    );
    program.running = null;
  }
};

export const printResult = (program: Program, INTERVAL_Id: any) => {
  const total = program.processes.reduce(
    (pre, process) => {
      const { waiting, excuted } = process.getInfo();
      return {
        waiting: pre.waiting + waiting,
        excuted: pre.excuted + excuted,
      };
    },
    { waiting: 0, excuted: 0 }
  );
  const processLength = program.processes.length;
  const totalWaiting = (total.waiting / processLength).toFixed(DECIMAL_PLACE);
  const totalExcuted = (total.excuted / processLength).toFixed(DECIMAL_PLACE);

  console.log('라운드로빈 방식 스케줄링이 종료되었습니다.');
  console.log(`평균 대기시간 = ${String(totalWaiting)}sec`);
  console.log(`평균 반환시간 = ${String(totalExcuted)}sec`);
  clearInterval(INTERVAL_Id);
};

export const runProcess = (program: Program, process: Process) =>
  new Promise((resolve) => {
    const targetId = process.getId();
    setTimeout(() => {
      program.updateCumulativeTime(RUN_TIME);
      process.addCurrent(RUN_TIME);

      if (process.isFinished()) {
        terminateProcess(program, process);
        return resolve('');
      }

      updateWaiting(program, targetId);
      updateExcuted(program);
      program.queue.enqueue(targetId);
      resolve('');
    }, INTERVAL);
  });

const terminateProcess = (program: Program, process: Process) => {
  program.running = null;
  process.updateStatus('terminated');
};

export const updateWaiting = (program: Program, targetId: ProcessId) => {
  program.processes.forEach((process, i) => {
    if (process.getStatus() === 'waiting') program.processes[i].addWaiting();
  });
};

export const updateExcuted = (program: Program) => {
  program.processes.forEach((process) => process.addExcuted());
};

import { Program, ProcessId } from './types';
import { Process } from './process';
import { INTERVAL, RUN_TIME, DECIMAL_PLACE } from './constants';

export const getProcess = (program: Program, id: ProcessId) =>
  program.processes[
    program.processes.findIndex((process) => process.getId() === id)
  ];

export const resetRunning = (program: Program) => {
  if (program.running) {
    const process = getProcess(program, program.running);
    process.getStatus() !== 'terminated' && process.updateStatus('waiting');
    program.running = null;
  }
};

export const updatedataBeforeRun = (program: Program, process: Process) => {
  setRunning(program, process);
  setWaiting(program);
};

const setRunning = (program: Program, process: Process) => {
  program.running = process.getId();
  process.updateStatus('running');
};

const setWaiting = (program: Program) =>
  program.processes.forEach((process) => {
    if (
      program.running !== process.getId() &&
      process.getStatus() !== 'terminated'
    )
      process.updateStatus('waiting');
  });

export const runProcess = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, INTERVAL);
  });
};

export const updateDataAfterRun = (program: Program, process: Process) => {
  program.updateCumulativeTime(RUN_TIME);
  process.addCurrent(RUN_TIME);
  updateWaitingTime(program);
  updateExcutedTime(program);
};

export const terminateProcess = (program: Program, process: Process) => {
  program.running = null;
  process.updateStatus('terminated');
};

export const updateWaitingTime = (program: Program) => {
  program.processes.forEach((process, i) => {
    if (process.getStatus() === 'waiting') program.processes[i].addWaiting();
  });
};

export const updateExcutedTime = (program: Program) => {
  program.processes.forEach((process) => process.addExcuted());
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

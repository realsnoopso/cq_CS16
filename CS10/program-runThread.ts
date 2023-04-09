import { Program } from './types';
import { RUN_TIME_THREAD, RUN_TIME_THREAD_LEFT } from './constants';
import { Process } from './process';

import { Worker } from 'worker_threads';

export const printThread = (program: Program) => {
  console.log(`이 프로그램은`);
  program.processes.forEach((process) => {
    const { id, total, thread } = process.getInfo();
    console.log(`프로세스${id}(${total}초) - 스레드 ${thread}개`);
  });
  console.log(`총 스레드는 6개입니다.`);
};

export const runProcessWithThread = (
  program: Program,
  process: Process
): Promise<number> => {
  return new Promise(async (resolve) => {
    const processTime = await runThread(process);
    resolve(processTime ?? null);
  });
};

const runThread = async (process: Process) => {
  const threads = new Set<Worker>();
  const isFirstRun = process.getCurrent() === 0;
  const num = isFirstRun ? process.getThreads() : RUN_TIME_THREAD_LEFT;
  let processTime = 0;
  for (let i = 0; i < num; i++) {
    threads.add(new Worker('./worker.ts'));
  }
  const promise: Promise<number> = new Promise((resolve) => {
    threads.forEach((worker) => {
      worker.on('message', () => {});
      worker.on('exit', () => {
        threads.delete(worker);
        processTime += isFirstRun ? RUN_TIME_THREAD : RUN_TIME_THREAD_LEFT;
        if (threads.size === 0) {
          resolve(processTime);
        }
      });
    });
  });
  return promise;
};

export const updateDataWithThreadAfterRun = (
  process: Process,
  processTime: number
) => process.addCurrent(processTime);

export const printResultWithThread = (INTERVAL_Id: any) => {
  console.log('모든 프로세스가 종료되었습니다.');
  clearInterval(INTERVAL_Id);
};

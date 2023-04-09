const { parentPort, workerData } = require('worker_threads');

parentPort.postMessage(2);

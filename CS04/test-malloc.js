import { memory } from './memory.js';
import { initiate } from './test-index.js';

console.log('-- test-malloc.js --');

const RESULT = JSON.stringify({
  stackElements: [
    { type: 'number', name: 'number', address: '0x0020', size: 32 },
    { type: 'string', name: 'string', address: '0x0048', size: 40 },
  ],
  stackSize: 72,
  stackPointer: '0x0048',
  heapElements: [
    { type: 'number', name: 'number', stackAddress: '0x0020', size: 32 },
    { type: 'string', name: 'string', stackAddress: '0x0048', size: 40 },
  ],
  heapSize: 72,
});

initiate(memory);

memory.malloc('number', 4);

const result = memory.malloc('string', 5);
// console.log(result);
console.log(JSON.stringify(result) === RESULT);

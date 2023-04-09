import { memory } from './memory.js';
import { initiate } from './test-index.js';

console.log('-- test-free.js --');

const RESULT = JSON.stringify({
  stackElements: [
    { type: 'number', name: 'number', address: '0x0020', size: 32 },
  ],
  stackSize: 32,
  stackPointer: '0x0020',
  heapElements: [
    {
      type: 'number',
      name: 'number',
      stackAddress: '0x0020',
      size: 32,
    },
    {
      type: 'string',
      name: 'string',
      stackAddress: '0x0048',
      size: 40,
    },
  ],
  heapSize: 72,
});

initiate(memory);

memory.malloc('number', 4);
memory.malloc('string', 5);
// console.log(memory.free('0x0048'));
console.log(JSON.stringify(memory.free('0x0048')) === RESULT);

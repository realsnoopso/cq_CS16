import { memory, call, usage, reset, heapdump } from './memory.js';
import { initiate } from './test-index.js';

console.log('-- test-etc.js --');

const RESULT_USUAGE = JSON.stringify({
  stackMaxSize: 1024,
  stackSize: 84,
  stackRemainSize: 940,
  heapMaxSize: 72,
  heapSize: 72,
  heapRemainSize: 928,
});
const RESULT_HEAPDUP = JSON.stringify([
  'type: number, size: 32, stackAddress: 0x0020',
  'type: string, size: 40, stackAddress: 0x0048',
]);
const RESULT_RESET = JSON.stringify({
  stackElements: [],
  stackPointer: '0x0000',
  stackSize: 0,
  stackMaxSize: 0,
  heapElements: [],
  heapSize: 0,
  heapMaxSize: 0,
});

initiate(memory);

memory.malloc('number', 4);
memory.malloc('string', 5);
call('foo', 2);

// console.log(usage());
console.log(JSON.stringify(usage()) === RESULT_USUAGE);

// console.log(heapdump());
const heapdumpResult = heapdump();
// console.log(heapdumpResult);
console.log(JSON.stringify(heapdumpResult) === RESULT_HEAPDUP);

// console.log(reset());
console.log(JSON.stringify(reset()) === RESULT_RESET);

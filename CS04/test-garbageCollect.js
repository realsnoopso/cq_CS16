import { memory, garbageCollect, call } from './memory.js';
import { initiate } from './test-index.js';

console.log('-- test-garbageCollect.js --');

const RESULT = JSON.stringify([
  { type: 'number', name: 'number', stackAddress: '0x0020', size: 32 },
  { type: 'string', name: 'string', stackAddress: '0x0048', size: 40 },
]);

initiate(memory);

memory.malloc('number', 4);
memory.malloc('string', 5);
call('foo', 2);
memory.free('0x0054');

const result = garbageCollect();
// console.log(result);
console.log(JSON.stringify(result) === RESULT);

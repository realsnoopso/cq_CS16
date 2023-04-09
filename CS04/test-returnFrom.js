import { memory, call, returnFrom } from './memory.js';
import { initiate } from './test-index.js';

console.log('-- test-returnFrom.js --');

const RESULT = JSON.stringify({
  stackElements: [
    { type: 'number', name: 'number', address: '0x0020', size: 32 },
    { type: 'string', name: 'string', address: '0x0048', size: 40 },
    { type: 'property', name: 'property', address: '0x004c', size: 4 },
    { type: 'property', name: 'property', address: '0x0050', size: 4 },
  ],
  stackPointer: '0x0050',
  stackSize: 80,
  stackMaxSize: 1024,
});
initiate(memory);

memory.malloc('number', 4);
memory.malloc('string', 5);
call('foo', 2);
console.log(JSON.stringify(returnFrom('foo')) === RESULT);

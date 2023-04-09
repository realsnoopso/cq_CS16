import { memory, call, callstack, returnFrom } from './memory.js';
import { initiate } from './test-index.js';

console.log('-- test-callStack.js --');

const RESULT =
  'number 0x0020 -> string 0x0048 -> property 0x004c -> property 0x0050 -> foo 0x0054';
const RESULT2 =
  'number 0x0020 -> string 0x0048 -> property 0x004c -> property 0x0050';
initiate(memory);

memory.malloc('number', 4);
memory.malloc('string', 5);
call('foo', 2);
console.log(callstack() === RESULT);
returnFrom('foo');
console.log(callstack() === RESULT2);

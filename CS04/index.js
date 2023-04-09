import {
  memory,
  call,
  heapdump,
  reset,
  callstack,
  returnFrom,
  garbageCollect,
} from './memory.js';

console.log('-------------------------------------- part A');
memory.init(1024, 1024);
memory.setSize('short', 4);
memory.setSize('int', 8);
memory.setSize('string', 16);
memory.malloc('int', 4);
memory.malloc('short', 5);
console.log(heapdump());
console.log('############# A:', memory.heap, memory.stack);
console.log('-------------------------------------- part B');
call('foo', 2);
const string1 = memory.malloc('crong', 1);
console.log(callstack());
call('bar', 1);
const string2 = memory.malloc('jk', 2);
returnFrom('bar');
memory.free(string1);
console.log(heapdump());
console.log('############# B:', memory.heap, memory.stack);
console.log('-------------------------------------- part C');
memory.free(string2);
console.log(callstack());
garbageCollect();
console.log(heapdump());
reset();
console.log(heapdump());
console.log('############# C:', memory.heap, memory.stack);

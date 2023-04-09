import { memory } from './memory.js';
import { decimalToHexString, hexStringToDecimal } from './utils.js';

console.log('-- test-init.js --');

const SIZEHEAP = 1000;
const SIZESTACK = 1024;
console.log(memory.init(SIZESTACK, SIZEHEAP) === decimalToHexString(0));
console.log(memory.heap.maxSize === SIZEHEAP);
console.log(memory.stack.maxSize === SIZESTACK);

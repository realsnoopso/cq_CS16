import { Memory } from './memory.js';

console.log('-- test-setSize.js --');

const memory = new Memory();
const RESULT = JSON.stringify([
  { type: 'number', length: 8 },
  { type: 'string', length: 2 },
  { type: 'boolean', length: 4 },
  { type: 'symbol', length: 4 },
  { type: 'bigint', length: 4 },
  { type: 'undefined', length: 4 },
  { type: 'null', length: 4 },
]);

const ERROR = `The type is already registered.`;

memory.setSize('number', 8);
memory.setSize('string', 2);
memory.setSize('boolean', 4);
memory.setSize('symbol', 4);
memory.setSize('bigint', 4);
memory.setSize('undefined', 4);
console.log(JSON.stringify(memory.setSize('null', 4)) === RESULT);
console.log(memory.setSize('null', 3) === ERROR); // error

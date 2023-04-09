import { memory, call } from './memory.js';
import { initiate } from './test-index.js';

// 마지막 스택 위치를 알려주는 스택 포인터에 포인터 변수를 paramCount만큼 반복해서 생성하고 스택 포인터를 증가시킨다.
// paramCount는 0부터 10이하 값이다.
// name은 최대 8자까지만 가능하다.
// call 실행할 때마다 name값을 스택에 기록하고 아래 callstack()에서 활용한다.

console.log('-- test-call.js --');

const RESULT = JSON.stringify({
  stackElements: [
    { type: 'number', name: 'number', address: '0x0020', size: 32 },
    { type: 'string', name: 'string', address: '0x0048', size: 40 },
    { type: 'property', name: 'property', address: '0x004c', size: 4 },
    { type: 'property', name: 'property', address: '0x0050', size: 4 },
    { type: 'function', name: 'foo', address: '0x0054', size: 4 },
  ],
  stackSize: 84,
  stackPointer: '0x0054',
});
initiate(memory);

memory.malloc('number', 4);
memory.malloc('string', 5);
// console.log(call('foo', 2));
console.log(JSON.stringify(call('foo', 2)) === RESULT);

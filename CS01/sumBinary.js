import { boolarray2numarray, numarray2boolarray } from './utils.js';

export function sumBinary(first, second) {
  let answer = [];
  const firstArr = boolarray2numarray(first);
  const secondArr = boolarray2numarray(second);
  let add = 0;
  while (true) {
    if (firstArr.length === 0 && secondArr.length === 0 && add === 0) break;
    const first = firstArr.pop() ?? 0;
    const second = secondArr.pop() ?? 0;
    const sum = first + second + add;
    add = sum >= 2 ? 1 : 0;
    answer.unshift(sum % 2);
  }
  return numarray2boolarray(answer);
}

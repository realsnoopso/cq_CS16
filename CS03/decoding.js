import { convertXToInt } from './utils.js';
import { instructionList } from './constant.js';

// console.log(decode('0001001010000011'), 'LOAD R1, R2, R3');
// console.log(decode('0011101011000100'), 'STORE R5, R3, R4');
// console.log(decode('0010111010111110'), 'LOAD R7, R2, #30');
// console.log(decode('0101011001000110'), 'AND R3, R1, R6');
// console.log(decode('0111100010000101'), 'ADD R4, R2, R5');
// console.log(decode('1010100110101000'), 'SUB R4, R6, #8');
// console.log(decode('1011100011111010'), 'MOV R4, #250');

export function decode(input) {
  if (!input) return { instruction: null, data: null };
  const instruction = convertXToInt(input.substring(0, 4)) - 1;
  const data = splitData({ instruction, input: input.substring(4) });
  return { instruction, data };
}

function splitData({ instruction, input }) {
  const MOV = instructionList.findIndex((v) => v === 'MOV') + 1;
  const hasValue = (instruction + 1) % 2 === 0;
  if (instruction === MOV) {
    const [a, b] = [0, 3];
    const registerA = getRegisterIndex(input.substring(a, b));
    const value = input.substring(b);
    return [registerA, value];
  }
  if (hasValue) {
    const [a, b, c, d] = [0, 3, 6, 7];
    const registerA = getRegisterIndex(input.substring(a, b));
    const registerB = getRegisterIndex(input.substring(b, c));
    const value = input.substring(d);
    return [registerA, registerB, value];
  }
  const [a, b, c, d] = [0, 3, 6, 9];
  const registerA = getRegisterIndex(input.substring(a, b));
  const registerB = getRegisterIndex(input.substring(b, c));
  const registerC = getRegisterIndex(input.substring(d));
  return [registerA, registerB, registerC];
}

export function getRegisterIndex(input) {
  return convertXToInt(input) - 1;
}

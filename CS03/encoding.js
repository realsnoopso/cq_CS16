import { convertIntToX, convertXToInt } from './utils.js';
import { instructionList } from './constant.js';

function convertRegisterToBinary(input) {
  return convertIntToX(input.split('R')[1], { base: 2, length: 3 });
}

export function encode(input) {
  const splited = stringToArray(input);
  const instruction = splited.shift();

  const { data, hasValue } = convertDataToBinaries({
    instruction,
    input: splited,
  });

  if (!data)
    return error('Please check it is valid input.', [
      {
        key: 'data',
        value: data,
      },
    ]);
  const DATA = data.join('');
  const INSTRUCTION = getInstructionBinary(instruction, hasValue);
  return INSTRUCTION + DATA;
}

function getInstructionBinary(input, hasValue) {
  let int = instructionList.findIndex((v) => v === input) + 1;
  if (hasValue) int += 1;
  return convertIntToX(int, {
    base: 2,
    length: 4,
  });
}

function convertDataToBinaries({ instruction, input }) {
  const last = input.pop();

  if (!isInstruction(instruction)) return { data: null, hasValue: null };

  if (instruction === 'MOV') {
    const registerA = convertRegisterToBinary(input.pop());
    let value = null;
    if (last.includes('#')) {
      value = convertIntToX(last.split('#')[1], {
        base: 2,
        length: 9,
      });
    } else {
      value = convertIntToX(last, {
        base: 2,
        length: 9,
      });
    }

    return { data: [registerA, value], hasValue: false };
  }

  if (last.includes('R')) {
    const registerC = convertRegisterToBinary(last);
    const registerB = convertRegisterToBinary(input.pop());
    const registerA = convertRegisterToBinary(input.pop());
    const fill = '000';
    return {
      data: [registerA, registerB, fill, registerC],
      hasValue: false,
    };
  }

  if (last.includes('#')) {
    const value = convertIntToX(last.split('#')[1], { base: 2, length: 5 });
    const registerB = convertRegisterToBinary(input.pop());
    const registerA = convertRegisterToBinary(input.pop());
    const fill = '1';
    return { data: [registerA, registerB, fill, value], hasValue: true };
  }

  return { data: null, hasValue: null };
}

function stringToArray(input) {
  return input.replaceAll(',', '').split(' ');
}

function isInstruction(instruction) {
  return instructionList.includes(instruction);
}

// console.log(encode('ADD R1, R2, R3'));
// console.log(encode('MOV R4, 0x00A0'));
// console.log(encode('MOV R5, 0x0002'));
// console.log(encode('LOAD R1, R4, R5'));
// console.log(encode('ADD R2, R1, #4'));
// console.log(encode('SUB R3, R1, R2'));
// console.log(encode('STORE R3, R4, #4'));

// console.log(encode('LOAD R1, R2, R3') === '0001001010000011');
// console.log(encode('STORE R5, R3, R4') === '0011101011000100');
// console.log(encode('LOAD R7, R2, #30') === '0010111010111110');
// console.log(encode('AND R3, R1, R6') === '0101011001000110');
// console.log(encode('ADD R4, R2, R5') === '0111100010000101');
// console.log(encode('SUB R4, R6, #8') === '1010100110101000');
// console.log(encode('MOV R4, #250') === '1011100011111010');

import {
  convertXToInt,
  addBinaries,
  subBinaries,
  andBinaries,
  orBinaries,
  convertIntToX,
} from './utils.js';
import { getMemory, useMemory } from './memory.js';
import { decode } from './decoding.js';
import { runInstructions } from './instructions.js';
import { error } from './error.js';

class Register {
  constructor() {
    this.value = '0';
  }

  save(value) {
    if (!value) {
      error('No value to save', [{ key: 'value', value: value }]);
      return false;
    }
    this.value = value;
    return true;
  }

  reset() {
    this.value = '0';
  }
}

class PC extends Register {
  count() {
    this.value = convertIntToX(convertXToInt(this.value, 16) + 16, {
      base: 16,
      length: 7,
    });
  }
}

class ALU {
  add(a, b) {
    return addBinaries(a, b);
  }
  sub(a, b) {
    return subBinaries(a, b);
  }
  and(a, b) {
    return andBinaries(a, b);
  }
  or(a, b) {
    return orBinaries(a, b);
  }
}

export const alu = new ALU();

class CPU {
  constructor() {
    this.registers = new Array(7).fill(new Register());
    this.pc = new PC();
    this.alu = new ALU();
  }
  reset() {
    this.pc.reset();
    this.registers.forEach((r) => {
      r.reset();
    });
  }

  fetch() {
    const address = getMemory(this.pc.value);
    cpu.exexcute(getMemory(this.pc.value));
  }

  dump() {
    // REGISTER들 값을 배열에 넣어서 리턴한다.
    const result = cpu.registers
      .map((r, i) => {
        return `R${i + 1}: ${r.value}`;
      })
      .join('\n');
    return result;
  }

  exexcute(word) {
    const { instruction, data } = decode(word);

    if (!String(instruction) || !data)
      return error('Please enter the valid input.', [
        {
          key: 'word',
          value: word,
        },
        { key: 'instruction', value: instruction },
        { key: 'data', value: data },
      ]);

    const success = runInstructions(instruction, data);
    if (!success)
      return error('Something went wrong. Try again.', [
        {
          key: 'word',
          value: word,
        },
        { key: 'instruction', value: instruction },
        { key: 'data', value: data },
      ]);

    cpu.pc.count();
    useMemory(word);
  }
}

export const cpu = new CPU();

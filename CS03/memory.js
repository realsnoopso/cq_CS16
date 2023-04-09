import { cpu } from './cpu.js';

const memory = new Map();

export function generateMemory() {}

export function writeMemory(key, value) {
  memory.set(key, value);
  getMemoryAll();
}

export function getMemory(key) {
  return memory.get(key);
}

export function getMemoryAll() {
  console.log('\n--------------------------');
  memory.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
  console.log('--------------------------\n');
}

export function useMemory(value) {
  const hex = cpu.pc.value;
  writeMemory(hex, value);
}

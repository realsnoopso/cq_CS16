import { cpu } from './cpu.js';
import { addBinaries } from './utils.js';
import { getMemory } from './memory.js';

export function runInstructions(key, values) {
  const instrucitonFuncs = [
    () => load(values),
    () => load(values, true),
    () => store(values),
    () => store(values, true),
    () => and(values),
    () => or(values),
    () => add(values),
    () => add(values, true),
    () => sub(values),
    () => sub(values, true),
    () => move(values),
  ];

  return instrucitonFuncs[key]();
}

function valuesFactory(values, hasValue) {
  const [a, b, c] = values;
  if (!String(a) || !String(b) || !String(c)) return false;

  const registerA = cpu.registers[a];
  const registerB = cpu.registers[b];

  if (hasValue) {
    const value = c;
    return { registerA, registerB, value };
  }

  const registerC = cpu.registers[c];
  return { registerA, registerB, registerC };
}

function load(values, hasValue) {
  if (hasValue) {
    const { registerA, registerB, value } = valuesFactory(values, true);
    if (!registerA || !registerB || !value) return false;

    const sum = addBinaries(registerB.value, value);
    registerA.save(getMemory(sum));
    return true;
  }
  const { registerA, registerB, registerC } = valuesFactory(values);
  if (!registerA || !registerB || !registerC) return false;

  const sum = addBinaries(registerB.value, registerC.value);
  registerA.save(getMemory(sum));
  return true;
}

function store(values, hasValue) {
  if (hasValue) {
    const { registerA, registerB, value } = valuesFactory(values, hasValue);
    if (!registerA || !registerB || !value) return false;

    const sum = addBinaries(registerB.value, value);
    writeMemory(sum, registerA.value);
    return true;
  }

  const { registerA, registerB, registerC } = valuesFactory(values, hasValue);
  if (!registerA || !registerB || !registerC) return false;

  const sum = addBinaries(registerB.value, registerC.value);
  writeMemory(sum, registerA.value);
  return true;
}

function and(values) {
  const { registerA, registerB, registerC } = values;
  if (!registerA || !registerB || !registerC) return false;

  const sum = cpu.alu.and(registerB.value, registerC.value);
  target.save(sum);
  return true;
}

function or(values) {
  const { registerA, registerB, registerC } = values;
  if (!registerA || !registerB || !registerC) return false;

  const sum = cpu.alu.or(registerB.value, registerC.value);
  target.save(sum);
  return true;
}

function add(values, hasValue) {
  if (hasValue) {
    const { registerA, registerB, value } = valuesFactory(values, hasValue);
    if (!registerA || !registerB || !value) return false;

    const sum = cpu.alu.add(registerB.value, value);
    registerA.save(sum);
    return true;
  }

  const { registerA, registerB, registerC } = valuesFactory(values, hasValue);

  if (!registerA || !registerB || !registerC) return false;

  const sum = cpu.alu.add(registerB.value, registerC.value);
  registerA.save(sum);
  return true;
}

function sub(values, hasValue) {
  if (hasValue) {
    const { registerA, registerB, value } = valuesFactory(values, hasValue);
    if (!registerA || !registerB || !value) return false;

    const sum = cpu.alu.sub(registerB.value, value);
    registerA.save(sum);
    return true;
  }
  const { registerA, registerB, registerC } = valuesFactory(values, hasValue);
  if (!registerA || !registerB || !registerC) return false;

  const sum = alu.sub(registerB.value, registerC.value);
  registerA.save(sum);
  return true;
}

function move(values) {
  const { registerA, value } = values;
  if (!registerA || !value) return false;

  if (offset) {
    registerA.save(value);
    return true;
  }
}

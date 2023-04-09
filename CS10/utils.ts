import { Program, ProcessId } from './types';

const MAX_NUM = 21;
const MIN_NUM = 1;
let ASCII_A = 97;

export const generateNum: number | any = (totals: number[]) => {
  const num = Math.ceil(Math.random() * (MAX_NUM - MIN_NUM) + MIN_NUM);
  if (totals.includes(num)) {
    return generateNum(totals);
  }
  return num;
};

let index = ASCII_A - 1;

export const generateId = () => {
  index++;
  return String.fromCharCode(index).toUpperCase();
};

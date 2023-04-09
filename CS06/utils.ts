import { ASCII_LOWER_A } from './constants';

export function getCharByNum(num: number) {
  return String.fromCharCode(ASCII_LOWER_A + num);
}

export function getNumByChar(char: string) {
  return char.charCodeAt(0);
}

export function getAllCases(numContainer: number[]) {
  const set: any[] = [];
  let numTemp = [...numContainer];
  numContainer.forEach((target) => {
    numTemp.forEach((num) => {
      const fileDiff: number = target;
      const rankDiff: number = num;
      set.push({ fileDiff, rankDiff });
    });
  });
  return set;
}

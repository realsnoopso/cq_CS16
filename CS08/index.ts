const isFactor = (number: number, potentialFactor: number): boolean =>
  number % potentialFactor == 0;

const isSquared = (number: number): boolean =>
  Math.floor(Math.sqrt(number)) ** 2 == number;

const isPerfect = (number: number): boolean =>
  sum(factors(number)) - number == number;

const isAbundant = (number: number): boolean =>
  sum(factors(number)) - number > number;

const isDeficient = (number: number): boolean =>
  sum(factors(number)) - number < number;

const isPrime = (number: number): boolean =>
  number > 1 && equalSet(factors(number), new Set([1, number]));

export const numberClassifier = {
  isFactor,
  isPerfect,
  isAbundant,
  isDeficient,
  isPrime,
  isSquared,
};

const equalSet = (aset: Set<number>, bset: Set<number>): boolean =>
  aset.size === bset.size && [...aset].every((a) => bset.has(a));

const factors = (number: number): Set<any> =>
  Array.from({ length: Math.floor(Math.sqrt(number)) }, (_, i) => i + 1)
    .filter((pod) => isFactor(number, pod))
    .reduce((factorSet, pod) => {
      factorSet.add(pod);
      factorSet.add(number / pod);
      return factorSet;
    }, new Set());

const sum = (factors: Set<any>) => {
  return [...factors].reduce((total, factor) => total + factor);
};

const NumberClassifier: any = {
  isPerfect: 'perfect',
  isAbundant: 'abundant',
  isDeficient: 'deficient',
  isPrime: 'prime',
  isSquared: 'squared',
};

type Classifier = (number: number) => boolean;

export const pipe =
  (...funcs: Classifier[]) =>
  (number: any) =>
    String(
      funcs.reduce(
        (curr: string, func: (number: number) => boolean) =>
          (curr += func(number) ? ` ${NumberClassifier[func.name]}` : ''),
        `${String(number)} :`
      )
    ) + '\n';

function print() {
  let result = '';
  new Array(99).fill(1).reduce((number, curr) => {
    result += pipe(
      isPerfect,
      isAbundant,
      isDeficient,
      isPrime,
      isSquared
    )(number);
    return number + 1;
  }, 2);
  return result;
}

console.log(print());

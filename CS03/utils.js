// calculate

export function addBinaries(a, b) {
  return calculateFactory(a, b, 'add');
}

export function subBinaries(a, b) {
  const result = convertXToInt(a) - convertXToInt(b);
  return result.toString(2);
}

export function andBinaries(a, b) {
  return calculateFactory(a, b, 'and');
}

export function orBinaries(a, b) {
  return calculateFactory(a, b, 'or');
}

function calculateFactory(a, b, operater) {
  const A = String(a).split('');
  const B = String(b).split('');

  let result = [];
  let up = 0;
  while (true) {
    if (A.length === 0 && B.length === 0 && up === 0) break;
    const a = A.pop() ?? 0;
    const b = B.pop() ?? 0;
    let sum = 0;
    switch (operater) {
      case 'add':
        const { remain, _up } = add(a, b, up);
        up = _up;
        result.push(remain);
      case 'and':
        result.push(and(a, b));
      case 'or':
        result.push(or(a, b));
    }
  }
  result = result.reverse().join('');
  return result;
}

function add(a, b, up) {
  let _up = up;
  const sum = Number(a) + Number(b) + _up;
  _up = sum === 2 ? 1 : 0;
  const remain = sum % 2;
  return { remain, _up };
}

function and(a, b) {
  let sum = !!Number(a) && !!Number(b);
  sum = sum ? 1 : 0;
  return sum;
}

function or(a, b) {
  let sum = !!Number(a) || !!Number(b);
  sum = sum ? 1 : 0;
  return sum;
}

// convert

export function convertXToInt(input, base) {
  const _base = base ?? 2;
  const result = parseInt(input, _base);
  return result;
}

export function convertIntToX(input, { base, length }) {
  const _base = base ?? 2;
  const _input = Number(input).toString(_base);
  let _length = length ?? 0;
  if (_base === 16) _length = 6;

  const result = fillEmptyElement(_length, _input);
  return result;
}

function fillEmptyElement(length, input) {
  let array = input.split('').map((v) => Number(v));
  let result = [];

  if (length > array.length) {
    result = new Array(length - array.length).fill(0);
  }
  array.forEach((v) => result.push(v));
  result = result.join('');
  return result;
}

// console.log(convertIntToX(3, { base: 2, length: 4 }) === '0011');
// console.log(convertIntToX(16, { base: 16 }) === '000010');
// console.log(convertXToInt('000010', 16) === 16);
// console.log(andBinaries('11011', '1011'));
// console.log(addBinaries('11011', '1011'));
// console.log(calculateFactory('11011', '1011', 'add'));
// console.log(orBinaries('11011', '1011'));
// console.log(convertXToInt('0x00a0', 16));

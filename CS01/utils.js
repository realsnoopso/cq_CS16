function boolarray2bin(array) {
  // [true, false] => 10
  let anwser = Number(array.map((v) => (v ? 0 : 1)).join(''));
  return anwser;
}

function bin2boolarray(binary) {
  // 10 => [true, false]
  const array = String(binary).split('');
  const answer = array.map((v) => (Number(v) === 0 ? true : false));
  return answer;
}

function boolarray2numarray(array) {
  // [true, false] => [0, 1]
  const anwser = array.map((v) => (v ? 0 : 1));
  return anwser;
}

function numarray2boolarray(array) {
  // [0, 1] => [true, false]
  const answer = array.map((v) => (v === 0 ? true : false));
  return answer;
}

export { boolarray2bin, bin2boolarray, boolarray2numarray, numarray2boolarray };

// const input = require('fs')
//   .readFileSync('/dev/stdin')
//   .toString()
//   .trim()
//   .split(' ');

function sum(input) {
  const A = input[0].split('');
  const B = input[1].split('');
  let result = [];
  let up = 0;
  while (true) {
    if (A.length === 0 && B.length === 0 && up === 0) break;
    const a = A.pop() ?? 0;
    const b = B.pop() ?? 0;
    const sum = Number(a) + Number(b) + up;
    up = sum >= 10 ? 1 : 0;
    result.push(sum % 10);
  }
  return result.reverse().join('');
}

// console.log(sum(input));

// test 영역

const test = [
  {
    input: `9223372036854775807 9223372036854775808
`,
    output: 18446744073709551615,
  },
];

test.forEach((v) => {
  const input = v.input.trim().split(' ');
  const output = String(v.output);
  console.log(output === String(Number(sum(input))));
});

// const input = require('fs')
//   .readFileSync('/dev/stdin')
//   .toString()
//   .trim()
//   .split('\n');

function getNumbers(input) {
  input.shift();
  return input.map((item) => {
    const [a, b] = item.split(' ');
    const _a = Number(a.split('').pop());
    let result = 0;
    let lastNums = [];
    let i = 0;
    while (i < 4) {
      lastNums.push(_a ** i % 10);
      i++;
    }
    result = result === 0 ? lastNums[b % 4] % 10 : 10;
    return result;
  });
}

// getNumbers(input).forEach((item) => console.log(item));

// test 코드

const test = [
  {
    input: `5
1 6
3 7
6 2
7 100
9 635
`,
    output: `1
7
6
1
9
`,
  },
];

test.forEach((v) => {
  const input = v.input.trim().split('\n');
  const output = v.output
    .trim()
    .split('\n')
    .map((v) => Number(v));
  console.log(output.join('') === getNumbers(input).join(''));
});

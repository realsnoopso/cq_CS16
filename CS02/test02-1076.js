// const input = require('fs')
//   .readFileSync('/dev/stdin')
//   .toString()
//   .trim()
//   .split('\n');

const resistance = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
};

function getResistance(input) {
  const first = resistance[input[0]];
  const second = resistance[input[1]];
  const third = resistance[input[2]];

  const value = first * 10 + second;
  const multiplier = 10 ** third;

  return value * multiplier;
}

// 테스트용
const test = [
  {
    input: `yellow
violet
red
`,
    output: 4700,
  },
  {
    input: `orange
red
blue
`,
    output: 32000000,
  },
  {
    input: `white
white
white
`,
    output: 99000000000,
  },
];

test.forEach((v) => {
  console.log(v.output === getResistance(v.input.trim().split('\n')));
});

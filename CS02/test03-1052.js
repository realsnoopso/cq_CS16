const test = [
  {
    input: `3 1
`,
    output: 1,
  },
  {
    input: `13 2
`,
    output: 3,
  },
  {
    input: `1000000 5
`,
    output: 15808,
  },
];

function solve(input) {
  const array = input
    .trim()
    .split(' ')
    .map((v) => Number(v));
  return pour(array[0], array[1]);
}

function pour(n, k) {
  let count = n;
  let weight = 1;
  let shopping = 0;

  while (k < count) {
    if (count % 2 === 1) {
      shopping += weight;
      count += 1;
    }
    weight = weight * 2;
    count = count / 2;
  }

  return shopping === 0 ? -1 : shopping;
}

test.forEach((v) => {
  console.log(v.output === solve(v.input));
});

export function bin2dec(bin) {
  let answer = 0;
  let array = bin.map((v) => (v ? 0 : 1)).reverse();
  for (let i = 0; i < array.length; i++) {
    answer += array[i] * 2 ** i;
  }
  return answer;
}

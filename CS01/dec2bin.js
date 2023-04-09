export function dec2bin(decimal) {
  let answer = [];
  let num = decimal;
  while (true) {
    if (num <= 0) break;
    const element = num % 2 === 0 ? true : false;
    answer.unshift(element);
    num = Math.floor(num / 2);
  }
  return answer;
}

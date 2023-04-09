function runSetTimeOut() {
  console.log('call setTimeout');
  console.log(Promise.resolve().then(() => console.log('after then')));
}

console.log('start code');
runSetTimeOut();
console.log('call after setTimeout');

// Promise.resolve()
//   .then(() => alert('프라미스 성공!'))
//   .then(() => alert('코드 종료'));

// let promise = Promise.resolve();

// promise.then(() => console.log('프라미스 성공!'));

// console.log('코드 종료'); // 얼럿 창이 가장 먼저 뜹니다.

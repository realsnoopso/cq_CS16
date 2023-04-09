# CS 03. CPU 시뮬레이터

## 체크리스트

- [x] 전체 구조도 만들기
- [x] Memory 만들기
- [x] instruction 만들기
- [x] ALU 만들기
  - [x] add() 만들기
  - [x] sub() 만들기
  - [ ] and() 만들기
  - [ ] or() 만들기
- [x] Register class 만들기
  - [x] save() 만들기
  - [x] reset() 만들기
- [x] PC, R1~R7 레지스터 생성하기
- [x] 각 instruction 완성하기
  - [x] add()
  - [x] or()
  - [x] add()
  - [x] sub()
  - [x] move()
- [x] reset() 만들기
- [x] fetch() 만들기
- [x] execute(int16) 만들기
- [x] dump() 만들기

조건
[X] Map을 활용해보기

## 구현

### 전체 구조도

<img width="1037" alt="Screen Shot 2023-01-09 at 1 36 38 PM" src="https://user-images.githubusercontent.com/96381221/211241840-077862ef-adfe-4d85-8371-ef4dfbc3a499.png">
<img width="1355" alt="Screen Shot 2023-01-09 at 1 36 48 PM" src="https://user-images.githubusercontent.com/96381221/211241841-b9dbf21f-03bc-4dfb-9451-8dd44c87a5c3.png">

```javascript
// memory.js
const memory = new Map();

function writeMemory(key, value: int16) {
  map.set(key, value);
}

function getMemory(key) {
  return map.get(key);
}
```

```javascript
// cpu.js
class Register {
  constructure() {
    value: number;
  }

  add() {}

  reset() {}
}

const pc = new Register();
const r1 = new Register();

function reset() {}

function fetch() {}

function exexcute(word) {
  int2bin(word);
  runInstructions();
}

function int2bin(word) {}

function dump() {}

class ALU {
  add() {}
  sub() {}
  and() {}
  or() {}
}
```

```javascript
// instructions.js
function runInstructions(key:int4, value: int12) {
  switch(key) {
    case 0001: return load(value);
    case 0010: return loadValue(value);
    case 0011: return store(value);
    ....
  }
}

function getRegister() {}

...
```

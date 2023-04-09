# 1. 순수함수 만들기

## Goal

- [x] 불변성 (Immutable) 값이나 변수를 적극 활용할 수 있다.
  - [x] object 타입은 변경이 가능하므로 `Object.freeze()`를 시켜주어야 한다.
  - [x] `map()`, `filter()`, `reduce()` 사용
- [x] 함수가 참조 투명성을 지키고, 부작용을 줄일 수 있도록 구현할 수 있다.
- [x] 순수함수 (Pure Function) 로 구현할 수 있다.

## Check List

- [x] 다음의 두 코드에서 중복된 코드를 줄이고, 함수형 표현으로 최대한 개선한다.
- [x] 1부터 100까지 숫자를 각 함수에 넣고 동작 결과가 동일해야 한다.

## Questions

- [ ] static 을 어떻게 함수형으로 구현하지?

```javascript
class ClassifierAlpha {
  number = 0;

  constructor(number) {
    this.number = number;
  }

  isFactor(potentialFactor) {
    return this.number % potentialFactor == 0;
  }

  factors() {
    var factorSet = new Set();
    for (var pod = 1; pod <= Math.sqrt(this.number); pod++) {
      if (this.isFactor(pod)) {
        factorSet.add(pod);
        factorSet.add(this.number / pod);
      }
    }
    return factorSet;
  }

  isPerfect() {
    return ClassifierAlpha.sum(this.factors()) - this.number == this.number;
  }

  isAbundant() {
    return ClassifierAlpha.sum(this.factors()) - this.number > this.number;
  }

  isDeficient() {
    return ClassifierAlpha.sum(this.factors()) - this.number < this.number;
  }

  static sum(factors) {
    var total = 0;
    factors.forEach((factor) => {
      total += factor;
    });
    return total;
  }
}

var alpha1 = new ClassifierAlpha(10);
var alpha2 = new ClassifierAlpha(6);

console.log(alpha1.isPerfect());
console.log(alpha2.isPerfect());
```

```javascript
class PrimeAlpha {
  number = 0;

  constructor(number) {
    this.number = number;
  }

  equalSet(aset, bset) {
    if (aset.size !== bset.size) return false;
    for (var a of aset) if (!bset.has(a)) return false;
    return true;
  }

  isPrime() {
    var primeSet = new Set([1, this.number]);
    return this.number > 1 && this.equalSet(this.factors(), primeSet);
  }

  isFactor(potentialFactor) {
    return this.number % potentialFactor == 0;
  }

  factors() {
    var factorSet = new Set();
    for (var pod = 1; pod <= Math.sqrt(this.number); pod++) {
      if (this.isFactor(pod)) {
        factorSet.add(pod);
        factorSet.add(this.number / pod);
      }
    }
    return factorSet;
  }
}

var prime1 = new PrimeAlpha(10);
var prime2 = new PrimeAlpha(7);

console.log(prime1.isPrime());
console.log(prime2.isPrime());
```

# 2. 고차함수 활용하기

## Goal

- [x] 클로저를 선언해서 매개변수 또는 리턴값으로 전달할 수 있다
- [x] map, filter, reduce 고차 함수를 활용할 수 있다
- [x] 클로저 관련된 다양한 표현을 학습한다

## Check List

- [x] 앞서 작성한 자연수 분류 ClassifierAlpha, PrimeAlpha 를 이용
- [x] 2-100까지 자연수 중에서 다음의 목록을 출력한다.
  - 완전수(perfect)
  - 과잉수(Abundant)
  - 부족수(Deficient)
  - 소수(Prime)
  - 정사각수(Squared)
- [x] map, filter, reduce 고차 함수를 활용한다.
- [x] 출력을 위해서는 반드시 클로저(또는 람다)를 선언하고 반복문 대신 reduce를 활용해서 출력해야 한다.
- [x] 자연수 중에서 다른 자연수의 제곱으로 표현되는 정사각수(squared) 판단 함수를 추가한다.

```javascript
예상 결과
2 : deficient, prime
3 : deficient, prime
4 : deficient, squared
5 : deficient, prime
6 : perfect,
7 : deficient, prime
8 : deficient,
9 : deficient, squared
10 : deficient,
11 : deficient, prime
12 : abundant,
13 : deficient, prime
14 : deficient,
15 : deficient,
16 : deficient, squared
17 : deficient, prime
18 : abundant,
19 : deficient, prime
...
88 : abundant,
89 : deficient, prime
90 : abundant,
91 : deficient,
92 : deficient,
93 : deficient,
94 : deficient,
95 : deficient,
96 : abundant,
97 : deficient, prime
98 : deficient,
99 : deficient,
100 : abundant, squared
```

## 개념 정리

1. 순수 함수: 동일한 property가 주어졌을 때 항상 같은 값을 리턴하는 함수
2. 고차 함수: 함수를 매개변수로 받는 함수, 또는 함수를 반환 값으로 사용하는 함수. 대표적인 고차 함수로는 map,filter,reduce가 있다.
3. 클로저: 함수와 함수가 선언된 어휘적 환경의 조합

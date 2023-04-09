# 1. 함수형 코드로 구현하기

## Check List

- [x] SquadSet 클래스 구현
  - [x] sum(other): 다른 요소를 더해서 합집합 리턴
  - [x] complement(other): 다른 요소를 빼서 차집합을 리턴, 값이 포함되어 있지 않으면 변화 X
  - [x] intersect(other): 다른 값과 비교해 교집합을 리턴
  - [x] resultAll(): 모든 요소를 1차원 배열로 리턴

```javascript
A 집합 = [1,2,3]
B 집합 = [1,3]
합집합sum = [1,2,3]
차집합complement = [2]
교집합intersect = [1,3]
```

- [x] CountSet 클래스 구현
  - [x] 특징: 불변 타입, 초기화할 때 Object 또는 HashMap으로 값을 넘길 수 있음, 새로운 요소를 추가하거나 삭제하면 새로운 CountSet 리턴, SquadSet과 달리 요소가 중복해서 있을 수 있음, 요소별 Count 값이 있음
  - [x] append(element): 새로운 요소를 추가, 새로운 CountSet 리턴
  - [x] remove(element): 기존에 요소가 있으면 Count 줄이기, 0이 되면 제거한 CountSet을 리턴
  - [x] countFor(element): 특정 요소에 대한 Count 값 리턴
  - [x] sum(other): CountSet에 다른 other CountSet 요소를 더해서 합집합 리턴
  - [x] complement(other): CountSet에서 다른 other CountSet 요소를 빼서 차집합을 리턴, 값이 포함되어 있지 않으면 변화 X, 만약 현재 CountSet보다 other CountSet 요소 Count가 더 큰 경우는 제거 (Count는 마이너스가 되지 않고 0보다 같거나 작으면 제거)
  - [x] resultAll(): 모든 요소와 Count를 Object 형태로 리턴

```javascript
A Count집합 = [1 : 2, 2 : 2, 3 : 2] //{1, 1, 2, 2, 3, 3}
B Count집합 = [1 : 1, 3 : 3] //{1, 3, 3, 3}
합집합sum = [1 : 3, 2 : 2, 3 : 5]
차집합complement = [1 : 1, 2: 2]
교집합intersect = [1 : 1, 3: 1]
```

## 구현 목표

- [x] 집합을 구현할 때 Array 사용
  - Object, HashMap, Set, HashSet 등 라이브러리는 사용 X
  - 핵심 로직 대신 입력이나 출력용으로 Object나 Map 구조로 값을 전달하는 것은 가능
- [x] 작성 코드의 속도 예측해보기
- [x] 테스트 코드 작성
- [x] 모든 클래스를 불변으로 작성해보기
- [x] 깊은 복사 사용

# 2. 고차함수 활용하기

## Check List

- [x] map() 추가: 클로저 또는 람다를 매개변수로 넘기기
- [x] filter() 추가: 클로저 또는 람다를 매개변수로 넘기기
- [x] display() 추가: 콘솔에 출력을 위함, 매개변수로 클로저, reduce 사용, 내부에서 출력 함수 호출X, 클로저 내부에서 처리
- [x] map, filter, reduce 처럼 고차함수로 동작하는 메소드를 스스로 설계해서 추가하기

## 구현 목표

- [ ] 커링 방식으로 함수 분해해서 구현
- [ ] 합성해서 처리할 수 있는 함수를 스스로 찾아서 개선하거나 새로 추가
- [ ] 반드시 내부 구현에서도 반복문 대신에 map, filter, reduce 고차 함수를 활용
- [ ] 새로 추가한 동작 확인을 위한 테스트 프로그램도 개선하고 동작을 확인

# 새로 알게된 개념 정리

## Monad

값을 감싸서 새로운 값을 만들어내는 데 사용되는 구조이다. 모나드는 순수함수와 함께 사용되어 데이터의 흐름과 상태 관리를 간단하게 할 수 있게 해준다. 함수를 안전하게 합성을 하기 위해 사용한다. 실제 값이 어떤 타입이든지 감싸서 처리해서 자기 자신 타입으로 다룰 수 있도록 제공한다. 하스켈의 Maybe나 스위프트 Optional이 대표적으로 monadic한 타입으로 Monad 구현체라고 부를 수 있다.

## Functor

카테고리와 카테고리를 맵핑하는 것. 맵핑 개념을 가진 추상적인 개념으로, 각 요소에 대한 함수 적용을 간단하게 수행할 수 있는 방법을 제공한다. Functor는 모나드의 일종이지만, 모나드와 비교하면 기능이 덜 복잡하고 제한적이다.

## endofunctor

카테고리를 바꿔도 동일한 카테고리가 되는 특별한 Functor

## Lazy evaluation

실제 함수 호출시 그 값이 필요할 때까지 계산하지 않음

```javascript
const L = {};
L.map = curry1(function* (f, iter) {
  const reduceIter = L.reduce(
    (acc, item) => (acc.push(f(item)), acc),
    [],
    iter
  );

  for (const acc of reduceIter) {
    yield last(acc);
  }
});

L.filter = curry1(function* (f, iter) {
  const reduceIter = L.reduce(
    (acc, item) => (f(item) ? (acc.push(item), acc) : nop),
    [],
    iter
  );

  for (const acc of reduceIter) {
    yield last(acc);
  }
});
```

## Generic Type

사용하는 쪽에서 타입을 정의할 수 있다.
(https://www.youtube.com/watch?v=pReXmUBjU3E&t=112s)

```typescript
function getSize<T>(arg: T[]): number {
  return arr.length;
}

const arr = [1, 2, 3];
getSize<number>(arr);
```

```typescript
interface Mobile<T> {
  name: string;
  price: number;
  option: T;
}

const m: Mobile<string> = {
  name: 's20',
  price: 900,
  option: 'good',
};
```

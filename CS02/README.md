# CS02. 영상 목록 편집

## 체크리스트

### Mission 1. 연속 배열(Array) 구현

- [x] 연속 배열 구조 작성
- [x] 배열 안에 데이터 삽입
  - id : `string`
  - 제목 : `string`
  - 재생 시간 : `number`
- [x] 제목 생성 로직 작성
- [x] id 생성 로직 작성
- [x] 재생 시간 랜덤 생성 로직 작성 (1~15초)
- [x] `add` 함수 작성
- [x] `get` 함수 작성

예상결과 및 동작예시

```
---영상클립 생성---
제목01(abcd):12초
제목02(afbc):1초
제목03(bdfa):7초
제목04(afaf):4초
제목05(abab):9초
제목06(acdc):15초
제목07(bdbd):2초
제목08(baaa):3초
제목09(cafe):14초
제목10(ccef):10초
제목11(afcd):12초
제목12(fabc):4초
제목13(dcba):1초
```

### Mission 2. 연결 리스트(Linked List) 구현

- [x] 연결 리스트 구조 작성
- [x] `add {id}` 명령어 구현
- [x] `insert {id} {index}` 명령어 구현
  - [x] index가 리스트의 길이를 넘어갈 경우 맨 끝에 삽입
- [x] `delete {id}` 명령어 구현
  - [x] 시작 위치부터 순차적으로 조회
  - [x] 뒤에 다른 영상 정보가 있으면 이어 붙이기
  - [x] 해당 node가 없는 경우 `node not found` 에러 출력
- [x] `render` 명령어 구현
  - 리스트 길이 : `number`
  - 전체 재생 시간 : `number`

예상결과 및 동작예시

```
> add xxxx
node not exist

> add abcd
|---[abcd, 12sec]---[end]

> add abcd
|---[abcd, 12sec]---[abcd, 12sec]---[end]

> delete abcd
|---[abcd, 12sec]---[end]

> add afaf
|---[abcd, 12sec]---[afaf, 4sec]---[end]

> insert cafe 0
|---[cafe, 14sec]---[abcd, 12sec]---[afaf, 4sec]---[end]

> insert cafe 7
|---[cafe, 14sec]---[abcd, 12sec]---[afaf, 4sec]---[cafe, 14sec]---[end]

> render
영상클립: 4개
전체길이: 44sec

> delete abcd
|---[cafe, 14sec]---[afaf, 4sec]---[cafe, 14sec]---[end]

> delete abcd
node not found

> delete cafe
|---[afaf, 4sec]---[cafe, 14sec]---[end]

> render
영상클립: 2개
전체길이: 18sec

```

# 전체 구조도

ArrayList를 데이터베이스처럼 두고, 해당 element를 이용해 타임라인을 그릴 수 있는 LinkedList 를 만들었다.
LinkedList의 노드의 data 안에는 id, time을 넣고 next에는 다음 Node를 넣었다.

<img width="416" alt="Screen Shot 2023-01-06 at 9 36 29 PM" src="https://user-images.githubusercontent.com/96381221/211013841-0ebf3454-6d2b-4147-8fc6-5def7dd16fde.png">

# 구현사항 정리 및 실행 결과

## Mission 1. 연속 배열(Array) 구현

### 1. 연속 배열 구조 작성

학습을 위해 Array List도 내장 함수를 사용하지 않고 operater를 직접 구현해보기로 했다. 코드의 초안은 아래와 같다.

```javascript
class ArrayList {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  get(index) {
    return this.items[index];
  }

  remove(index) {
    this.items.splice(index, 1);
  }

  size() {
    return this.items.length;
  }
}

const list = new ArrayList();
```

`items`안의 각 element의 데이터 형식은 다음과 같이 구성하고, Class 화 했다.

```javascript
class Element {
  id: string,
  title: string,
  time: number,
}
```

### 2. 제목 생성 로직 작성

### 3. id 생성 로직 작성

- 문제: 중복값 처리를 어떻게 할 것인가?
- 해결: id 생성 로직은 중복 값 없이 고유한 id값을 갖게 하기 위해 알파벳 순(`aaaa -> baaa -> bbaa -> bbba...`)으로 순차적으로 출력하기로 했다. fromCharCode() 라는 내장함수를 이용하면 ASCII 코드를 index를 이용해 불러올 수 있다. 알파벳의 index는 `97~122` 까지 이므로 `[97, 97, 97, 97] -> [98, 97, 97, 97]...` 와 같은 방식으로 접근하기로 했다.

### 4. 재생 시간 랜덤 생성 로직 작성

## Mission 2. 연결 리스트(Linked List) 구현

### 1. 연결 리스트 구조 작성

연결 리스트 구조는 다음과 같이 클래스로 작성했다.

```javascript
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(id) {

  }

  insert(id, index) {
    // if index > length, the position is the end of list
  }

  delete(id) {
    // find a node to delete
    // if index is not end, connect next node to previous node.
    // if the node is not found, return error
  }

  deleteAll(id) {
  }

  render() {
    const totalLength; //number
    const totalTime; //number
    return {totalLength, totalTime}
  }
}

const list = new LinkedList();
list.append('aabb');
```

각 node는 다음과 같이 구성했다.

```javascript
class Node {
  id: string,
  time: number,
  next: number
}
```

### 2. `add {id}` 명령어 구현

- 문제: 원래 데이터 구조는 Node를 별도로 두지 않고 Eelment를 통째로 받아서 List에 삽입하는 것이었다. 그렇게 했더니 중복 값이 있을 때 하나의 element에 두 개의 next를 넣어야 해 문제가 생겼다.
- 해결: 별도로 Node class를 만들어 해결했다.

### 3. `render` 명령어 구현

### 4. `insert {id} {index}` 명령어 구현

### 5. `delete {id}` 명령어 구현

- 문제: 이 경우에도 중복 항목 때문에 이슈가 생겼다. 동일한 id가 존재할 경우 어떤 항목을 제거해야 할까?
- 해결: 내장함수 select(), selectAll() 과 같은 방식으로 처리해보면 어떨까 생각했다. delete()는 가장 먼저 닿는 1개의 항목만 제거, deleteAll은 여러개 항목 전부를 제거한다.
  중복 코드를 삭제하기 위해 deleteAll()을 호출할 경우 delete()가 호출되며, findAll 이라는 property를 두고 특정 부분에서만 동작이 달라지도록 했다.

- 문제: 맨 앞 항목을 제거하는 코드를 지나면 while 문에서 자꾸 오류가 생겼다.
- 해결: while 문으로 진입하기 전 재귀 호출하도록 변경했다.

```javascript
delete(id, findAll) {
    if (!this.head) return console.log(`cannot find the node`);

    if (this.head.data.id === id) {
      this.head = this.head.next;
      this.update(-1, -1 * this.head.data.time);
      if (findAll) {
        this.delete(id, true);
      }
    }
...
```

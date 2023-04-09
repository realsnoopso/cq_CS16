# 체크리스트

- [x] Memory, Stack, Heap 객체 만들기
- [x] init(stackSize, heapSize)
  - [x] decimal 을 hex로 변경하는 코드 만들기
  - [x] hex를 decimal로 변경하는 코드 만들기
- [x] setSize(type, length)
- [x] malloc(type, count)
- [x] free(pointer)
- [x] call(name, paramCount)
- [x] returnFrom(name)
- [x] usage()
- [x] callstack()
- [x] heapdump()
- [x] garbageCollect()
- [x] reset()

# 전체 구조

코드의 구조는 다음과 같이 설계되었다. 메모리는 각각 Stack, Heap으로 나뉘어진다.
Stack의 element 안에는 각각 type, name, address, size가 존재하며, pointer가 가장 마지막에 추가된 element의 주소를 나타낸다.
Heap의 element는 별도의 주소가 존재하지 않으며, type, name, size, 그리고 어떤 stack을 참조하는지 나타내는 stackAddress를 추가했다.

<img width="414" alt="Screen Shot 2023-01-13 at 3 48 05 PM" src="https://user-images.githubusercontent.com/96381221/212255484-d137bbc6-d466-4a8c-bc01-5abee256d184.png">

```javascript
// Stack
{
  elements: [
    { type: 'number', name: 'number', address: '0x0020', size: 32 },
    { type: 'string', name: 'string', address: '0x0048', size: 40 },
  ],
  size: 72,
  maxSize: 1024,
  stackPointer: '0x0048',
}

// Heap
{
  elements: [
    { type: 'number', name: 'number', stackAddress: '0x0020', size: 32 },
    { type: 'string', name: 'string', stackAddress: '0x0048', size: 40 },
  ],
  maxSize: 1024,
  size: 72,
}
```

# 구현 과정

### setSize

자바스크립트의 primitive type과 각각의 byte 크기를 입력해주었다.

```javascript
memory.setSize('number', 8);
memory.setSize('string', 2);
memory.setSize('boolean', 4);
memory.setSize('symbol', 4);
memory.setSize('bigint', 4);
memory.setSize('undefined', 4);
memory.setSize('null', 4);
```

### malloc

malloc()은 메모리를 관리하는 함수로 C,C++에 존재한다. type\* size 사이즈 만큼 Stack에 메모리를 할당하고, Heap에는 StackAddress를 저장했다.

```javascript
initiate(memory); // 기본적인 선언
memory.malloc('number', 4);
memory.malloc('string', 5);

// 결과
{
  stackElements: [
    { type: 'number', name: 'number', address: '0x0020', size: 32 },
    { type: 'string', name: 'string', address: '0x0048', size: 40 },
  ],
  stackSize: 72,
  stackPointer: '0x0048',
  heapElements: [
    { type: 'number', name: 'number', stackAddress: '0x0020', size: 32 },
    { type: 'string', name: 'string', stackAddress: '0x0048', size: 40 },
  ],
  heapSize: 72,
}
```

### free

입력받은 address 값으로 해당되는 Stack element을 없애고, Heap element의

```javascript

initiate(memory);
memory.malloc('number', 4);
memory.malloc('string', 5);
memory.free('0x0048');

//result
{
  stackElements: [ { type: 'number', name: 'number', address: '0x0020', size: 32 } ],
  stackSize: 32,
  stackPointer: '0x0020',
  heapElements: [
    {
      type: 'number',
      name: 'number',
      stackAddress: '0x0020',
      size: 32
    },
    {
      type: 'string',
      name: 'string',
      stackAddress: '0x0048',
      size: 40
    }
  ],
  heapSize: 72
}
```

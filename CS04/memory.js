import { decimalToHexString, hexStringToDecimal } from './utils.js';
import { error } from './error.js';

const POINTER_MEMORY_SIZE = 4;
const MIN_TYPE_SIZE = 8;

const BASE_ADDRESS = decimalToHexString(0);
const INITIAL_HEAP_SIZE = 0;
const INITIAL_HEAP_MAX_SIZE = 0;
const INITIAL_STACK_POINTER = BASE_ADDRESS;
const INITIAL_STACK_SIZE = 0;
const INITIAL_STACK_MAX_SIZE = 0;

export class Memory {
  constructor() {
    this.heap = new Heap();
    this.stack = new Stack();
    this.baseAddress = BASE_ADDRESS;
    this.types = [];
  }

  init(stackSize, heapSize) {
    this.stack.maxSize = stackSize;
    this.heap.maxSize = heapSize;
    return this.baseAddress;
  }

  setSize(type, length) {
    const types = this.types;
    if (this.checkTypeDuplication(type))
      return error('The type is already registered.');
    types.push({ type, length });
    return types;
  }

  malloc(type, count) {
    const defaultSize = this.findType(type.size);
    const size = getSize(defaultSize, count);
    if (this.checkExceedSize(size)) return;
    const address = decimalToHexString(
      hexStringToDecimal(this.stack.pointer) + size
    );

    this.stack.elements.push({ type, name: type, address, size });
    this.stack.size += size;
    this.stack.pointer = address;

    this.heap.elements.push({ type, name: type, stackAddress: address, size });
    this.heap.size += size;

    return {
      stackElements: this.stack.elements,
      stackSize: this.stack.size,
      stackPointer: this.stack.pointer,
      heapElements: this.heap.elements,
      heapSize: this.heap.size,
    };
  }

  free(pointer) {
    const stack = this.stack;
    const heap = this.heap;

    stack.elements = stack.elements.filter((v) => {
      if (stack.pointer === v.address) {
        stack.size = stack.size - v.size;
        stack.pointer = decimalToHexString(
          hexStringToDecimal(stack.pointer) - v.size
        );
      } else {
        return v;
      }
    });

    if (stack.pointer) {
      heap.elements.find((v) => {
        if (v.address === pointer) {
          v.address = null;
        }
      });
    }

    return {
      stackElements: this.stack.elements,
      stackSize: this.stack.size,
      stackPointer: this.stack.pointer,
      heapElements: this.heap.elements,
      heapSize: this.heap.size,
    };
  }

  // utils

  checkTypeDuplication(type) {
    let result = false;
    this.types.forEach((v) => {
      if (v.type === type) return (result = true);
    });
    return result;
  }

  checkExceedSize(size) {
    if (this.stack.size + size > this.stack.maxSize) {
      error('The stack size is exceeded.');
      return true;
    }
    if (this.heap.size + size > this.heap.maxSize) {
      error('The heap size is exceeded.');
      return true;
    }
    return false;
  }

  findStackElement(pointer) {
    let result = null;
    this.stack.elements.forEach((v) => {
      if (v.address === pointer) return (result = v);
    });
    return result;
  }

  findType(type) {
    let result = null;
    this.types.forEach((v) => {
      if (v.type === type) return (result = v);
    });
    return result;
  }

  addStckElements(type, name, size) {
    const stack = this.stack;
    const address = decimalToHexString(
      hexStringToDecimal(this.stack.pointer) + size
    );
    stack.elements.push({
      type,
      name,
      address,
      size,
    });
    stack.size += size;
    this.stack.pointer = address;
  }
}

class Heap {
  constructor() {
    this.elements = [];
    // [{type: 'number', address: '0xAF00', size: 6}}]
    this.size = INITIAL_HEAP_SIZE;
    this.maxSize = INITIAL_HEAP_MAX_SIZE;
  }
}

class Stack {
  constructor() {
    this.elements = [];
    // [{name:'foo()' address: '0xAF00', size: 7}]
    this.pointer = INITIAL_STACK_POINTER;
    this.size = INITIAL_STACK_SIZE;
    this.maxSize = INITIAL_STACK_MAX_SIZE;
  }
}

export const memory = new Memory();

export function call(name, paramCount) {
  if (paramCount > 10) return error('The number of parameters is exceeded.');
  if (name.length > 8) return error('The name is too long.');

  let i = paramCount;
  while (i > 0) {
    memory.addStckElements('property', 'property', POINTER_MEMORY_SIZE);
    i--;
  }
  memory.addStckElements('function', name, POINTER_MEMORY_SIZE);

  return {
    stackElements: memory.stack.elements,
    stackSize: memory.stack.size,
    stackPointer: memory.stack.pointer,
  };
}

export function returnFrom(name) {
  // 증가했던 스택 공간을 비우고 이전 호출 위치로 이동한다. X
  // 이 때 name값은 call() 호출로 가장 최근에 호출한 name과 동일해야 한다. X
  // 가장 최근보다 이전에 호출한 name이면 에러값을 throw 한다. X
  // 만약 call() 호출 이후에 malloc()으로 생성한 stack 영역에 포인터 값이 있다면 같이 비운다.
  // 단, malloc()으로 생성된 힙 영역의 메모리는 free()할 수 없고 스택에 있던 포인터 변수만 삭제한다.
  // call()을 호출한 경우가 없을 경우 아무런 동작을 하지 않는다.
  const stack = memory.stack;
  let isRecent = false;
  let newStackElements = [];
  stack.elements.map((v) => {
    if (
      v.address === stack.pointer &&
      v.type === 'function' &&
      v.name === name
    ) {
      v.address = null;
      memory.free(stack.pointer);
      stack.size = stack.size - v.size;
      stack.pointer = decimalToHexString(stack.size);
      return (isRecent = true);
    }
    return newStackElements.push(v);
  });
  if (!isRecent) return error('The name is not recent.');
  stack.elements = newStackElements;
  return {
    stackElements: stack.elements,
    stackPointer: stack.pointer,
    stackSize: stack.size,
    stackMaxSize: stack.maxSize,
  };
}

export function usage() {
  const stack = memory.stack;
  const heap = memory.heap;

  return {
    stackMaxSize: stack.maxSize,
    stackSize: stack.size,
    stackRemainSize: stack.maxSize - stack.size,
    heapMaxSize: heap.size,
    heapSize: heap.size,
    heapRemainSize: heap.maxSize - heap.size,
  };
}

export function callstack() {
  // 현재 스택에 쌓여있는 호출 스택을 문자열로 리턴한다.
  // 출력하는 스택 포인터는 base address + offset address 형태로 표현한다
  // 예를 들어 call("foo", 0), call("bar", 1), call("dap", 2) 순서로 호출한 경우는 foo() 0xAF00 -> bar() 0xB100 -> dap() 0xBF00 형태로 함수 이름과 스택의 주소를 리턴한다.
  // 그 후에 returnFrom("dap") 호출한 경우는 foo() 0xAF00 -> bar() 0xB100 형태로 dap을 리턴하고 남은 함수 이름과 스택의 주소를 리턴한다.
  const stack = memory.stack;
  const result = [];
  stack.elements.map((v) => {
    if (!v.address) return;
    return result.push(`${v.name} ${v.address}`);
  });
  return result.join(' -> ');
}

export function heapdump() {
  const heap = memory.heap;
  return heap.elements.map((v) => {
    return `type: ${v.type}, size: ${v.size}, stackAddress: ${v.stackAddress}`;
  });
}

export function garbageCollect() {
  const heap = memory.heap;
  const newHeapElements = [];
  heap.elements.forEach((v) => {
    if (!v.stackAddress) {
      const size = v.size;
      heap.size -= size;
      return;
    }
    return newHeapElements.push(v);
  });
  heap.elements = newHeapElements;
  return newHeapElements;
}

export function reset() {
  const stack = memory.stack;
  const heap = memory.heap;
  stack.elements = [];
  stack.size = INITIAL_STACK_SIZE;
  stack.maxSize = INITIAL_STACK_MAX_SIZE;
  stack.pointer = INITIAL_STACK_POINTER;
  heap.elements = [];
  heap.size = INITIAL_HEAP_SIZE;
  heap.maxSize = INITIAL_HEAP_MAX_SIZE;

  return {
    stackElements: stack.elements,
    stackPointer: stack.pointer,
    stackSize: stack.size,
    stackMaxSize: stack.maxSize,
    heapElements: heap.elements,
    heapSize: heap.size,
    heapMaxSize: heap.maxSize,
  };
}

function getSize(defaultSize, count) {
  let size = 0;
  if (defaultSize >= MIN_TYPE_SIZE) size = defaultSize * count;
  else size = MIN_TYPE_SIZE * count;
  return size;
}

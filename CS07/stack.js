export class Stack {
  constructor() {
    this.arr = [];
    this.index = 0;
  }

  getLength() {
    return this.arr.length;
  }

  push(item) {
    this.arr[this.index++] = item;
  }

  pop() {
    if (this.index <= 0) return null;
    const result = this.arr[--this.index];
    return result;
  }

  getLast() {
    return this.arr[this.index - 1];
  }

  get(index) {
    return this.arr[index];
  }

  searchCloseTag(element) {
    let result = false;
    this.arr.forEach((v) => {
      if (v.element === element) result = true;
    });
    return result;
  }
}

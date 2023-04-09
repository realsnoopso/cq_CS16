export class LinkedList {
  constructor() {
    this.head = null;
    this.totalLength = 0;
  }

  createNode(value) {
    const node = new Node();
    node.generate(value);
    return node;
  }

  update(legth) {
    this.totalLength += legth;
  }

  get() {
    let current = this.head;
    while (current) {
      // console.log(current.data);
      const next = current.next;
      current = next;
    }

    console.log(this.head);
  }

  add(value) {
    const node = this.createNode(value);
    if (!node) return;

    if (!this.head) {
      this.head = node;
      return this.update(1);
    }

    if (!this.head.next) {
      this.head.next = node;
      return this.update(1);
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
    this.update(1);
  }
}

class Node {
  constructor() {
    this.data = null;
    this.next = null;
  }

  generate(value) {
    this.data = value;
  }
}

const linkedList = new LinkedList();
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
linkedList.get();

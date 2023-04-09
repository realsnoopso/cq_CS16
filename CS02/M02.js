import { ArrayList } from './M01.js';
const array = new ArrayList();
array.add();
array.add();
array.add();
array.add();
array.add();
array.add();

class Node {
  constructor() {
    this.data = null;
    this.next = null;
  }

  generate(id, time) {
    this.data = { id, time };
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.totalLength = 0;
    this.totalTime = 0;
  }

  createNode(id) {
    const element = array.items.find((v) => v.id === id);
    if (!element) {
      console.log('Fail to generate a node');
      return null;
    }
    const node = new Node();
    node.generate(element.id, element.time);
    return node;
  }

  add(id) {
    const node = this.createNode(id);
    if (!node) return;

    if (!this.head) {
      this.head = node;
      return this.update(1, node.data.time);
    }

    if (!this.head.next) {
      this.head.next = node;
      return this.update(1, node.data.time);
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
    this.update(1, node.data.time);
  }

  insert(id, index) {
    const node = this.createNode(id);
    if (!node) return;

    const isLastIndex = index + 1 >= this.totalLength;
    const isFirstIndex = index === 0;

    if (isLastIndex) {
      return this.add(id);
    }

    if (isFirstIndex || !this.head) {
      if (this.head.next) node.next = this.head.next;
      this.head = node;
      return this.update(1, node.data.time);
    }

    let current = this.head;
    let i = -1;
    while (current.next) {
      if (i === index) {
        node.next = current.next;
        current.next = node;
        this.update(1, node.data.time);
        break;
      }
      current = current.next;
      i++;
    }
  }

  delete(id, findAll) {
    if (!this.head) return console.log(`cannot find the node`);

    if (this.head.data.id === id) {
      this.head = this.head.next;
      this.update(-1, -1 * this.head.data.time);
      if (findAll) {
        this.delete(id, true);
      }
    }

    let i = 0;
    let current = this.head;
    while (current.next) {
      if (current.next.data.id === id) {
        const target = current.next;
        current.next = current.next.next;
        this.update(-1, -1 * target.data.time);
        if (!findAll) break;
      }
      current = current.next;
      i++;
    }

    if (!current) console.log(`cannot find the node`);
  }

  deleteAll(id) {
    this.delete(id, true);
  }

  update(legth, time) {
    this.totalLength += legth;
    this.totalTime += time;
    this.get();
    this.render();
  }

  get() {
    let start = '|';
    let end = '[end]';
    let list = [];
    list.push(start);
    let current = this.head;
    while (current) {
      list.push(`[${current.data.id}, ${current.data.time}]`);
      const next = current.next;
      current = next;
    }
    list.push(end);
    const result = list.join('---');
    console.log(result);
  }

  render() {
    const result = `영상클립: ${this.totalLength}개\n전체길이: ${this.totalTime}sec`;
    console.log(result);
  }
}

const list = new LinkedList();
list.add('aaaa');
list.add('aaaa');
list.add('aaaa');
list.add('baaa');
list.add('bbaa');
list.add('bbba');
list.add('aaaa');
list.add('bbbb');
list.deleteAll('aaaa');
list.deleteAll('baaa');
list.insert('baaa', 2);
list.insert('baaa', 40);

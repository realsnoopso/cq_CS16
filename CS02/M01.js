const ASCII_A = 97;
const ASCII_Z = 122;
const ID_LENGTH = 4;

export class Element {
  constructor() {
    this.id = null;
    this.title = null;
    this.time = null;
  }

  generate(end) {
    this.id = generateId(end.id);
    this.title = generateTitle(end.title);
    this.time = generateTime();
    this.next = null;
    return this;
  }

  setThis(element) {
    this.id = element.id;
    this.title = element.title;
    this.time = element.time;
    this.next = element.next;
  }

  setNext(element) {
    this.next = element;
  }

  getNext() {
    return this.next;
  }
}

export class ArrayList {
  constructor() {
    this.items = [];
  }

  end = this.items ? this.items[this.items.length] : new Element();

  add() {
    const element = new Element().generate(this.end);
    this.items.push(element);
    this.end = element;
  }

  get() {
    console.log('---영상클립 생성---');
    this.items.forEach((v) => console.log(`${v.title}(${v.id}):${v.time}초`));
  }

  getDetails(id) {
    return this.items.find((v) => v.id === id);
  }

  size() {
    return this.items.length;
  }
}

function generateId(codes) {
  if (!codes) {
    return new Array(4).fill(String.fromCharCode(97)).join('');
  }
  let result = String(codes)
    .split('')
    .map((v) => v.charCodeAt(0));

  if (result[result.length] === ASCII_Z) return null;

  let i = 0;
  while (i <= ID_LENGTH) {
    if (result[0] === ASCII_A) {
      result[0]++;
      break;
    }
    if (result[i + 1] && result[i] > result[i + 1]) {
      result[i + 1]++;
      break;
    }
    if (i === result.length - 1) {
      result[i]++;
      break;
    }
    i++;
  }

  return result.map((c) => String.fromCharCode(c)).join('');
}

function generateTime() {
  const min = 1;
  const max = 15;
  return Math.floor(Math.random() * (max - min) + min);
}

function generateTitle(end) {
  let count = 1;
  if (end) count = Number(end.slice(2)) + 1;
  if (count < 10) count = '0' + String(count);
  return '제목' + String(count);
}

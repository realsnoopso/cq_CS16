import { LexerAnalyer } from './tokenizer.js';
import { TOKENS, POSITION } from './constants.js';
import { LinkedList } from './linkedList.js';
import { Stack } from './stack.js';
import { Tag } from './tag.js';
import { findCloseTagIndex, checkTagType } from './utils.js';
export class Parser {
  constructor() {
    this.stack = new Stack();
    this.linkedList = new LinkedList();
    this.currentTag = null;
  }

  parse(lexemeContiner) {
    let segmentContainer = [];
    let segment = [];
    lexemeContiner.forEach((lexeme, i) => {
      const nextLexeme = lexemeContiner[i + 1];
      if (!nextLexeme) {
        segment.push(lexeme);
        segmentContainer.push(segment);
        segment = [];
        return;
      }
      if (nextLexeme === 'LeftArrowBracker') {
        segment.push(lexeme);
        segmentContainer.push(segment);
        segment = [];
        return;
      }
      return segment.push(lexeme);
    });

    if (!this.tagFactory(segmentContainer)) return 'Error: Invalid tag';

    this.generateTree(this.stack);

    console.log('-------------');
    console.log(this.linkedList.get());
    // console.log(this.tree.root.children);
    // console.log(this.tree.root.children.children);
  }

  generateTree(stack) {
    let data = null;
    let length = stack.arr.length;

    let i = 0;
    while (i <= length) {
      let tag = stack.get(i);
      let compare = stack.pop();

      if (tag.position === POSITION.end) {
        return;
      }
      if (tag.element !== compare.element) {
        return;
      }

      data = {
        element: tag.element,
      };
      if (tag.attributes) data.attributes = tag.attributes;
      if (tag.text) data.text = tag.text;
      this.linkedList.add(data);
      data = null;
      i++;
    }
    return true;
  }

  tagFactory(segmentContainer) {
    let tag = new Tag();
    segmentContainer.forEach((segment, i) => {
      // console.log(segment);
      const position = segment.includes(TOKENS.get('/'))
        ? POSITION.end
        : POSITION.start;
      tag.position = position;

      const startTag = segment[0];
      const endTagIndex = findCloseTagIndex(segment);
      const endTag = segment[endTagIndex];

      const isTagValid = checkTagType(startTag, endTag);
      if (!isTagValid) return false;
      tag.type = startTag;

      if (tag.position === POSITION.end) {
        const element = segment[2];
        tag.element = element;
        this.stack.push(tag);
        tag = new Tag();

        return true;
      }

      const element = segment[1];
      tag.element = element;

      if (endTagIndex !== segment.length - 1) {
        const text = segment.slice(endTagIndex + 1, segment.length);
        tag.text = text;
      }

      const remains = segment.slice(2, endTagIndex);
      const attributes = [];
      remains.forEach((lexeme, i) => {
        if (lexeme === TOKENS.get('=')) {
          const key = remains[i - 1];
          const value = remains[i + 1];
          attributes.push({ key, value });
        }
      });
      if (attributes.length) tag.attributes = attributes;

      this.stack.push(tag);
      tag = new Tag();
    });
    return true;
  }
}

const data1 = `<price unit="dallor" type="low"><body><test>ddd</test></body></price>`;
const data2 = `"<!DOCTYPE html><HTML lang="ko"><BODY><P>BOOST<IMG SRC=\"codesquad.kr\"></IMG><BR/></P></BODY></HTML>"`;

const lexemeContiner = new LexerAnalyer().input(data1);
// const lexemeContiner = new LexerAnalyer().input(data2);
const parser = new Parser();
parser.parse(lexemeContiner);

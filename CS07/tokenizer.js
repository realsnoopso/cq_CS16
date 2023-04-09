import { TOKENS } from './constants.js';

export class LexerAnalyer {
  input(str) {
    const tokens = this.tokenize(str);
    const lexemes = this.classify(tokens);
    return lexemes;
  }

  tokenize(str) {
    const chars = str.split('');
    const tokenContainer = [];
    let word = '';
    for (const char of chars) {
      if (isNotLiteral(char)) {
        if (word !== '') {
          tokenContainer.push(`${word}`);
          word = '';
        }
        if (char === ' ') continue;
        tokenContainer.push(char);
        continue;
      }
      word += char;
    }
    // console.log('tokenize', { tokenContainer });
    return tokenContainer;
  }

  classify(tokenContainer) {
    let lexemeContainer = [];
    tokenContainer.forEach((token) => {
      if (isNotLiteral(token)) {
        return lexemeContainer.push(TOKENS.get(token));
      }
      return lexemeContainer.push(`token(${token})`);
    });
    // console.log('classify', { lexemeContainer });
    return lexemeContainer;
  }
}

function isNotLiteral(token) {
  return TOKENS.has(token);
}

const data1 = `<price unit="dallor" type="low"><BODY>29.99</BODY></price>`;
const data2 = `<price><BODY>29.99</BODY></price>`;
const data3 = `[1, [2,[3]],'hello', 'world', null]`;
const data4 = `[ 23, “JK”, false ]`;
const error1 = `<HTML lang="ko"></BODY>`;

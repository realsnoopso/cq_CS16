import { TOKENS, TAG_TYPE } from './constants.js';

export function removeSigns(str) {
  return str.replace(/<|\/|>/g, '');
}

export function findCloseTagIndex(segment) {
  let result = null;
  segment.forEach((lexeme, i) => {
    if (lexeme === TOKENS.get('>') || lexeme === TOKENS.get(']'))
      return (result = i);
  });
  return result;
}

export function checkTagType(startTag, endTag) {
  const [startTagType, endTagType] = [startTag, endTag].map((lexeme) => {
    if (lexeme === TOKENS.get('<') || lexeme === TOKENS.get('>')) {
      return TAG_TYPE.arrowBracker;
    }
    if (lexeme === TOKENS.get('[') || lexeme === TOKENS.get(']')) {
      return TAG_TYPE.squareBarcker;
    }
  });
  return startTagType === endTagType;
}

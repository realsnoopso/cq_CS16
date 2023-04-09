const IDENTIFIER = { HtmlIdentifier: 'HTML', BodyIdentifier: 'BODY' };
export const SEPARATORS = {
  LeftArrowBracker: `<`,
  RightArrowBracker: `>`,
  LeftSquareBracker: `[`,
  RightSquareBracker: `]`,
  Comma: `,`,
  Blank: ` `,
};
const OPERATORS = { Equal: '=', Add: '+', Sub: '-', Mul: '*', Div: '/' };

export const tokenTypes = {
  indetifier: IDENTIFIER,
  separator: SEPARATORS,
  operator: OPERATORS,
};

export const TOKENS = new Map();

Object.values(tokenTypes).forEach((type) => {
  Object.keys(type).forEach((key) => {
    TOKENS.set(type[key], key);
  });
});

export const POSITION = {
  start: 1,
  end: 2,
};

export const TAG_TYPE = {
  arrowBracker: 1,
  squareBarcker: 2,
};

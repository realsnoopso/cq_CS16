import { Side } from './types';
import { PIECES, Names, ASCII_LOWER_A } from './constants';
import { getCharByNum } from './utils';
import { Position } from './position';

export class Piece {
  name: Names;
  symbol: string;
  side: Side;
  value: number;

  constructor(name: Names, side: Side) {
    this.name = name;
    this.symbol = PIECES[name].symbol[side];
    this.side = side;
    this.value = PIECES[name].value;
  }
}

export class Pawn extends Piece {
  private activeNum: number;

  constructor(side: Side) {
    super('pawn', side);
    this.activeNum = 0;
  }

  reset() {
    this.activeNum = 0;
  }

  init(activeNum: number) {
    const file = this.side === 'black' ? 2 : 7;
    const rank = getCharByNum(activeNum);

    return rank + String(file);
  }

  // possiblePositions() {
  //   const file = position.file + 1;
  //   const rank = position.rank;
  //   position.file = file;
  //   position.rank = rank;
  // }
}

export class Knight extends Piece {
  constructor(side: Side) {
    super('knight', side);
  }

  possiblePositions() {}
}

export class Bishop extends Piece {
  constructor(side: Side) {
    super('bishop', side);
  }

  possiblePositions() {}
}

export class Rook extends Piece {
  constructor(side: Side) {
    super('rook', side);
  }

  possiblePositions() {}
}

export class Queen extends Piece {
  constructor(side: Side) {
    super('queen', side);
  }

  possiblePositions() {}
}

export class King extends Piece {
  constructor(side: Side) {
    super('king', side);
  }

  possiblePositions() {}
}

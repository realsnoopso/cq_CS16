import { Side } from './types';
import { Piece, Bishop, Pawn, Knight, Rook, Queen, King } from './piece';
import { PIECES, Names, WIDTH, HEGITH, SIDES, NAMES } from './constants';
import { Player } from './player';
import { getCharByNum } from './utils';

import { Position } from './position';

export class Board {
  view: any;
  turn: Side;
  black: Player;
  white: Player;

  constructor() {
    this.view = this.initBoard();
    this.turn = SIDES[0];
    this.black = new Player();
    this.white = new Player();
  }

  initBoard() {
    let i = 1;
    let result = new Map();

    while (i <= HEGITH) {
      const row = new Map();
      let j = 0;
      while (j < WIDTH) {
        row.set(getCharByNum(j), null);
        j++;
      }
      result.set(i, row);
      i++;
    }

    return result;
  }

  init() {
    // pawn
    NAMES.forEach((name) => {
      this.initPiece(name);
    });

    if (this.turn === SIDES[0]) {
      this.turn = SIDES[1];
      this.init();
      return;
    }
    this.turn = SIDES[0];
  }

  initPiece(name: string) {
    const side = this.turn;
    const FIRST_FILE = this.turn === SIDES[0] ? 1 : 8;
    const SECOND_FILE = this.turn === SIDES[0] ? 2 : 7;

    switch (name) {
      case 'pawn': {
        const pawn = new Pawn(side);
        this.placePiece(pawn);
        break;
      }
      case 'knight': {
        const knight = new Knight(side);
        this.placePiece(knight);
        break;
      }
      case 'bishop': {
        const bishop = new Bishop(side);
        this.placePiece(bishop);
        break;
      }
      case 'rook': {
        const rook = new Rook(side);
        this.placePiece(rook);
        break;
      }
      case 'queen': {
        const queen = new Queen(side);
        this.placePiece(queen);
        break;
      }
      case 'king': {
        const king = new King(side);
        this.placePiece(king);
      }
      default: {
        console.log('error');
      }
    }
  }

  move(from: string, to: string) {
    const list = this.view;
    // const target = list.get(from);
    // if (target) list.set(to, target);
    // list.delete(from);
  }

  placePiece(piece: Piece) {
    const name: Names = piece.name;
    const side: Side = this.turn;
    PIECES[name].ranks.forEach((rank) => {
      this.view.get(PIECES[name].file(side)).set(getCharByNum(rank), piece);
    });
  }
}

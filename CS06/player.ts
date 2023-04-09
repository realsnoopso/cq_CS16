import { Piece } from './piece';

export class Player {
  activePieces: {
    queen: number;
    rook: number;
    bishop: number;
    knight: number;
    pawn: number;
  };
  score: number;

  constructor() {
    this.activePieces = { queen: 0, rook: 0, bishop: 0, knight: 0, pawn: 0 };
    this.score = 0;
  }
}

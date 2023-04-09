import { getCharByNum } from './utils';
import { MAX_DIFF } from './constants';
import { getAllCases } from './utils';
import { Piece } from './piece';
import { Position } from './types';

class Verification {
  piece: Piece;

  constructor(piece: Piece) {
    this.piece = piece;
  }

  isInRange(file: Position['file'], rank: Position['rank']) {
    const isFileValid = file > 0 && file <= 8;
    const isRankValid = /^[a-h]+$/.test(rank);
    return isFileValid && isRankValid;
  }

  basicMovement() {
    const position = this.piece.position;
    const cases = getAllCases([1, -1]);
    const possiblePositions: any[] = [];
    cases.forEach((diff) => {
      const { fileDiff, rankDiff } = diff;
      const file = position.file + fileDiff;
      const rank = getCharByNum(position.rank.charCodeAt(0) + rankDiff);
      if (this.isInRange(file, rank)) possiblePositions.push({ file, rank });
    });
    return possiblePositions;
  }

  diagonalMovement() {
    const possiblePositions: any[] = [];
    const diffContainer: number[] = [];

    let i = 1;
    while (i <= MAX_DIFF) {
      diffContainer.push(i);
      diffContainer.push(-i);
      i++;
    }

    const cases = getAllCases(diffContainer);
    cases.forEach((diff) => {
      const { fileDiff, rankDiff } = diff;
      const file = this.file + fileDiff;
      const rank = getCharByNum(this.rank.charCodeAt(0) + rankDiff);
      if (this.isInRange(file, rank)) possiblePositions.push({ file, rank });
    });
    return possiblePositions;
  }

  lShapedMovement() {
    // 나중에 다시 하기
    const cases = getAllCases([2, -1]);
    const possiblePositions: any[] = [];
    cases.forEach((diff) => {
      const { fileDiff, rankDiff } = diff;
      const file = this.file + fileDiff;
      const rank = getCharByNum(this.rank.charCodeAt(0) + rankDiff);
      if (this.isInRange(file, rank)) possiblePositions.push({ file, rank });
    });
    return possiblePositions;
  }

  linearMovement() {
    let i = 1;
    const possiblePositions: any[] = [];
    while (i <= MAX_DIFF) {
      possiblePositions.push({ file: 0, rank: i });
      possiblePositions.push({ file: i, rank: 0 });
      possiblePositions.push({ file: 0, rank: -i });
      possiblePositions.push({ file: -i, rank: 0 });
      i++;
    }

    // 불순물 걸러내야함
  }
}

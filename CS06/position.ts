import { getCharByNum } from './utils';
import { MAX_DIFF } from './constants';
import { getAllCases } from './utils';

export class Position {
  file: number;
  rank: string;
  initial: { file: Position['file']; rank: Position['rank'] };
  possible!: Position[];

  constructor(file: Position['file'], rank: Position['rank']) {
    this.file = file;
    this.rank = rank;
    this.initial = { file, rank };
  }

  reset() {
    this.file = this.initial.file;
    this.rank = this.initial.rank;
  }

  // [fileDiff: number, rankDiff: number];
  getPossiblePositions(diffContainer: [Position['file'], Position['rank']][]) {
    diffContainer.map((diff) => {
      const [fileDiff, rankDiff] = diff;
      fileDiff;
    });
  }
}

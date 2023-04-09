import { Board } from './board';
import { Piece } from './piece';
import { EMPTY } from './constants';
import { getNumByChar } from './utils';

export class Print {
  print(board: Board) {
    const view = board.view;
    let result = [];
    for (let [rowKey, rowValue] of view.entries()) {
      let row = [];
      for (let [columnKey, columnValue] of rowValue.entries()) {
        if (columnValue) row.push(`${columnValue.symbol}`);
        else row.push(EMPTY[getEmtpyIndex(rowKey, columnKey)]);
      }
      result.push(row.join(''));
    }
    return result.join('\n');
  }
}

function getEmtpyIndex(rowKey: number, columnKey: string) {
  if (rowKey % 2 === 1) {
    return getNumByChar(columnKey) % 2 === 1 ? 0 : 1;
  }
  return getNumByChar(columnKey) % 2 === 1 ? 1 : 0;
}

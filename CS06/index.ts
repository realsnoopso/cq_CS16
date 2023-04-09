import { Board } from './board';
import { Print } from './print';

const board = new Board();

board.init();
console.log(new Print().print(board));
// console.log(board.move('1a', '2a'));

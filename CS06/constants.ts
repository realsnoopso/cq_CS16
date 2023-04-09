import { Side } from './types';

export const MAX_DIFF = 7;
export const ASCII_LOWER_A = 97;
export const WIDTH = 8;
export const HEGITH = 8;
export const SIDES: Array<'black' | 'white'> = ['black', 'white'];
export type Names = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
export const NAMES = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'];
export const EMPTY = ['⬜️', '⬛️'];

export const FILES = {
  first: { black: 1, white: 8 },
  second: { black: 2, white: 7 },
};

export const PIECES = {
  king: {
    value: 0,
    symbol: { black: '♚ ', white: '♔ ' },
    maxNum: 0,
    move: { file: 0, rank: 0 },
    ranks: [3],
    file: (side: Side) => FILES.first[side],
  },
  queen: {
    value: 9,
    symbol: { black: '♛ ', white: '♕ ' },
    maxNum: 1,
    ranks: [4],
    file: (side: Side) => FILES.first[side],
  },
  rook: {
    value: 5,
    symbol: { black: '♜ ', white: '♖ ' },
    maxNum: 2,
    ranks: [0, 7],
    file: (side: Side) => FILES.first[side],
  },
  bishop: {
    value: 3,
    symbol: { black: '♝ ', white: '♗ ' },
    maxNum: 2,
    ranks: [2, 5],
    file: (side: Side) => FILES.first[side],
  },
  knight: {
    value: 3,
    symbol: { black: '♞ ', white: '♘ ' },
    maxNum: 2,
    ranks: [1, 6],
    file: (side: Side) => FILES.first[side],
  },
  pawn: {
    value: 1,
    symbol: { black: '♟ ', white: `♙ ` },
    maxNum: 8,
    initialPosition: { black: { file: 1, rank: 2 }, white: {} },
    ranks: [0, 1, 2, 3, 4, 5, 6, 7],
    file: (side: Side) => FILES.second[side],
  },
};

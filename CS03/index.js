import { cpu } from './cpu.js';
import { encode } from './encoding.js';

cpu.exexcute(encode('ADD R1, R2, R3'));
cpu.exexcute(encode('ADD R1, R2, #3'));
cpu.exexcute(encode('SUB R1, R2, #1'));
cpu.exexcute(encode('LOAD R1, R2, R3'));
cpu.fetch();
cpu.dump();

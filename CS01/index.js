import { dec2bin } from './dec2bin.js';
import { bin2dec } from './bin2dec.js';
import { sumBinary } from './sumBinary.js';
import { boolarray2bin, bin2boolarray } from './utils.js';

console.log('----test-bin2dec----');
console.log(bin2dec(bin2boolarray(10011)) === 19);
console.log(bin2dec(bin2boolarray(101)) === 5);
console.log(bin2dec(bin2boolarray(111111)) === 63);

console.log('----test-dec2bin----');
console.log(boolarray2bin(dec2bin(19)) === 10011);
console.log(boolarray2bin(dec2bin(24)) === 11000);

// test code
console.log('----test-sumBinary----');
console.log(
  boolarray2bin(sumBinary(dec2bin(45), dec2bin(45))) ===
    boolarray2bin(dec2bin(90))
);
console.log(
  boolarray2bin(sumBinary(dec2bin(12), dec2bin(4))) ===
    boolarray2bin(dec2bin(16))
);

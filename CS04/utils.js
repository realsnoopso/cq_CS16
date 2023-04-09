export function decimalToHexString(decimalValue) {
  return '0x' + decimalValue.toString(16).padStart(4, '0');
}

export function hexStringToDecimal(hexString) {
  return parseInt(hexString, 16);
}

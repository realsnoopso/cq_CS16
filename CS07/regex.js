// const x = '*';
// const test = new RegExp(`(?<=&&)([^&&]+)(?=&&)`);

let x = '*';
const regex = new RegExp(`</tag>`);

let text = '<tag></tag>';

let result = regex.exec(text);

console.log(result);

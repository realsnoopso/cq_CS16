const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', (arg1, arg2) => {
  console.log(`event emitted with args: ${arg1}, ${arg2}`);
});

myEmitter.emit('event', 'yyy', 'kkk');

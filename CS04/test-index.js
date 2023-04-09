export function initiate(memory) {
  const SIZEHEAP = 1000;
  const SIZESTACK = 1024;

  memory.init(SIZESTACK, SIZEHEAP);
  memory.setSize('number', 8);
  memory.setSize('string', 2);
  memory.setSize('boolean', 4);
  memory.setSize('symbol', 4);
  memory.setSize('bigint', 4);
  memory.setSize('undefined', 4);
  memory.setSize('null', 4);
}

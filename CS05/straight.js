export class Straight {
  getLength(coordinates) {
    const [x1, y1] = coordinates[0];
    const [x2, y2] = coordinates[1];
    const x = Math.abs(x1 - x2);
    const y = Math.abs(y1 - y2);
    const length = Math.sqrt(x * x + y * y);
    return length;
  }
}

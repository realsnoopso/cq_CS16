import { Polygon } from './polygon.js';

export class Triangle extends Polygon {
  constructor(coordinates) {
    super(coordinates);
  }

  getTriangleArea(input) {
    const straightLengthes = input ?? this.straightLengthes;
    const [a, b, c] = straightLengthes;
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return area;
  }
}

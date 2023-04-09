import { Triangle } from './triangle.js';

export class Square extends Triangle {
  constructor(coordinates) {
    super(coordinates);
  }

  getSquareArea() {
    const [a, b, c, d] = this.straightLengthes;
    const setA = [a, b, c];
    const setB = [a, c, d];
    const A = this.getTriangleArea(setA);
    const B = this.getTriangleArea(setB);
    return A + B;
  }
}

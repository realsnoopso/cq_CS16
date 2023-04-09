import { getSets } from './utils.js';
import { Straight } from './straight.js';
import { Triangle } from './triangle.js';

export class Polygon {
  constructor(coordinates) {
    this.coordinates = coordinates;
    this.straightLengthes = this.getStraightLengthes(getSets(coordinates));
  }

  getStraightLengthes(sets) {
    const lengthes = [];
    sets.map((set) => {
      const straight = new Straight();
      const length = straight.getLength(set);
      lengthes.push(length);
    });
    return lengthes;
  }

  getPolygonArea() {
    const coordinates = [...this.coordinates];
    const target = coordinates.pop();

    const sets = [];
    let i = coordinates.length;
    while (i >= 0) {
      const a = coordinates[i];
      const b = coordinates[i + 1];
      if (a && b) sets.push([target, a, b]);
      i--;
    }

    let result = 0;
    sets.forEach((set) => {
      const triangle = new Triangle(set);
      result += triangle.getTriangleArea();
    });

    return result;
  }
}

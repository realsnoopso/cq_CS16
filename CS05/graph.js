import { padLeft, getSets } from './utils.js';

export class Graph {
  constructor(coordinates) {
    this.maxHeight = 24;
    this.maxWidth = 24;
    this.coordinates = coordinates;
  }

  createGraph(coordinates) {
    const result = this.markOnGraph(coordinates)
      .map((v) => v.join(''))
      .join('\n');

    return result;
  }

  createGridlines() {
    const EMPTY = '⬜️';
    const column = new Array(this.maxWidth).fill(EMPTY);
    return new Array(this.maxHeight).fill(column);
  }

  addDatalabels(graph) {
    const DIVIDER_X = 'ㅡ';
    const DIVIDER_Y = 'ㅣ';

    let i = this.maxHeight;
    const result = graph.map((row) => {
      let labels = i % 2 === 0 ? padLeft(i) + DIVIDER_Y : '  ' + DIVIDER_Y;
      let newRow = [...row];
      newRow.unshift(labels);
      i--;
      return newRow;
    });

    result.push(
      new Array(this.maxWidth + 1).fill(DIVIDER_X).fill('  + ', 0, 1)
    );

    let xLabels = [' 0 '];
    let j = 1;
    while (j <= this.maxWidth) {
      if (j % 2 === 0) xLabels.push(padLeft(j));
      else xLabels.push('  ');
      j++;
    }
    result.push(xLabels);
    return result;
  }

  markOnGraph(coordinates) {
    const MARK = '⬛️';
    const gridlines = this.createGridlines();
    let graph = gridlines;

    console.log(coordinates);
    coordinates.forEach((coordinate) => {
      const x = coordinate[0] - 1;
      const y = this.maxHeight - coordinate[1];
      const row = [...graph[y]];
      row[x] = MARK;
      graph[y] = row;
    });
    return this.addDatalabels(graph);
  }
}

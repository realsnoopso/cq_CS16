import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { Graph } from './graph.js';
import { Triangle } from './triangle.js';
import { Square } from './square.js';
import { Polygon } from './polygon.js';
import { Straight } from './straight.js';

const rl = readline.createInterface({ input, output });
const question = (question) => rl.question(question);
const close = () => rl.close();
const write = (content) => process.stdout.write(content);

function getCoordinates(input, options) {
  const maxHeight = options.maxHeight;
  const maxWidth = options.maxWidth;
  let isExceed = false;
  const result = input.split('-').map((element) =>
    element
      .replace('(', '')
      .replace(')', '')
      .split(',')
      .map((num, i) => {
        if (i === 0) {
          if (maxWidth < Number(num)) return (isExceed = true);
          else return Number(num);
        }
        if (maxHeight < Number(num)) return (isExceed = true);
        else return Number(num);
      })
  );
  if (!isExceed) return result;
  else return null;
}

async function printResult(inputs) {
  let coordinates = null;
  const graph = new Graph();
  if (inputs)
    coordinates = getCoordinates(inputs, {
      maxHeight: graph.maxHeight,
      maxWidth: graph.maxWidth,
    });
  else
    coordinates = getCoordinates(
      await question('좌표를 입력하세요. 예: (10,10)-(14,15)'),
      {
        maxHeight: graph.maxHeight,
        maxWidth: graph.maxWidth,
      }
    );

  if (!coordinates) {
    console.log('error');
    return close();
  }
  const result = graph.createGraph(coordinates);
  const calcuration = calcurate(coordinates);
  write('\n' + result + '\n\n');
  write(calcuration + '\n');
  close();
}

function calcurate(coordinates) {
  if (coordinates.length === 1) return 'error';
  switch (coordinates.length) {
    case 2:
      const straight = new Straight();
      const length = straight.getLength(coordinates);
      return '두 점 사이의 거리는' + String(length);
    case 3:
      const triangle = new Triangle(coordinates);
      const triangleArea = triangle.getTriangleArea();
      return '삼각형의 넓이는' + String(triangleArea);
    case 4:
      const square = new Square(coordinates);
      const squareArea = square.getSquareArea();
      return '사각형의 넓이는' + String(squareArea);
    default:
      const polygon = new Polygon(coordinates);
      const polygonArea = polygon.getPolygonArea();
      return '다각형의 넓이는' + String(polygonArea);
  }
}
printResult('(10,10)-(14,15)'); // 5.656854249492381
printResult('(10,10)-(14,15)-(5,3)'); // 5
// printResult('(10,10)-(14,15)-(2,10)-(5,3)-(2,1)'); // 29.5

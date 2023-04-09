import { SquadSet } from './SquadSet';
import { CountSet } from './ CountSet';

const squadSet = new SquadSet([2, 3, 4]);
const countSet = new CountSet();
console.log(squadSet.sum([1, 2, 3]));
console.log(squadSet.complement([1, 2, 3]));

countSet.append(1);
countSet.append(1);
countSet.append(3);
countSet.append(3);
console.log(
  countSet.complement([
    [1, 2],
    [2, 1],
  ])
);
console.log(countSet.resultAll());

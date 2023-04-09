import { SquadSet } from './SquadSet';

const squadSet = new SquadSet([2, 3, 4]);

describe('sum', () => {
  it('general', () => {
    expect(squadSet.sum([1, 2, 3])).toStrictEqual([1, 2, 3, 4]);
  });
  it('all same', () => {
    expect(squadSet.sum([2, 3, 4])).toStrictEqual([2, 3, 4]);
  });
});

describe('complement', () => {
  it('general', () => {
    expect(squadSet.complement([1, 2, 3])).toStrictEqual([1]);
  });
  it('all different', () => {
    expect(squadSet.complement([5, 6, 7])).toStrictEqual([5, 6, 7]);
  });
  it('all same', () => {
    expect(squadSet.complement([2, 3, 4])).toStrictEqual([]);
  });
});

describe('intersect', () => {
  it('general', () => {
    expect(squadSet.intersect([1, 2, 3])).toStrictEqual([2, 3]);
  });
  it('all same', () => {
    expect(squadSet.intersect([2, 3, 4])).toStrictEqual([2, 3, 4]);
  });
  it('all different', () => {
    expect(squadSet.intersect([5, 6, 7])).toStrictEqual([]);
  });
});

describe('resultAll', () => {
  it('general', () => {
    expect(squadSet.resultAll()).toStrictEqual([2, 3, 4]);
  });
});

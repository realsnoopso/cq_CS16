import { CountSet } from './ CountSet';

describe('append', () => {
  it('initial', () => {
    const countSet = new CountSet();
    expect(countSet.append(1)).toStrictEqual([[1, 1]]);
  });

  it('general', () => {
    const countSet = new CountSet();
    countSet.append(1);
    const result = countSet.append(2);
    expect(result).toStrictEqual([
      [1, 1],
      [2, 1],
    ]);
  });

  it('has the element', () => {
    const countSet = new CountSet();
    countSet.append(1);
    countSet.append(2);
    const result = countSet.append(1);
    expect(result).toStrictEqual([
      [1, 2],
      [2, 1],
    ]);
  });
});

describe('remove', () => {
  it('initial', () => {
    const countSet = new CountSet();
    expect(countSet.remove(1)).toStrictEqual([]);
  });

  it('remove all', () => {
    const countSet = new CountSet();
    countSet.append(1);
    expect(countSet.remove(1)).toStrictEqual([]);
  });

  it('remove one', () => {
    const countSet = new CountSet();
    countSet.append(1);
    countSet.append(1);
    expect(countSet.remove(1)).toStrictEqual([[1, 1]]);
  });
});

describe('countFor', () => {
  it('initial', () => {
    const countSet = new CountSet();
    expect(countSet.countFor(1)).toStrictEqual(0);
  });

  it('has the element', () => {
    const countSet = new CountSet();
    countSet.append(1);
    countSet.append(1);
    expect(countSet.countFor(1)).toStrictEqual(2);
  });

  it('has not the element', () => {
    const countSet = new CountSet();
    countSet.append(1);
    countSet.append(1);
    expect(countSet.countFor(2)).toStrictEqual(0);
  });
});

describe('sum', () => {
  it('initial', () => {
    const countSet = new CountSet();
    expect(
      countSet.sum([
        [1, 2],
        [2, 1],
      ])
    ).toStrictEqual([
      [1, 2],
      [2, 1],
    ]);
  });

  it('has the elements', () => {
    const countSet = new CountSet();
    countSet.append(1);
    countSet.append(1);
    const result = countSet.sum([
      [1, 2],
      [2, 1],
    ]);
    expect(result).toStrictEqual([
      [1, 4],
      [2, 1],
    ]);
  });
});

describe('complement', () => {
  it('initial', () => {
    const countSet = new CountSet();
    expect(
      countSet.complement([
        [1, 2],
        [2, 1],
      ])
    ).toStrictEqual([]);
  });

  it('has the elements', () => {
    const countSet = new CountSet();
    countSet.append(1);
    countSet.append(1);
    countSet.append(3);
    expect(countSet.complement([[1, 2]])).toStrictEqual([[3, 1]]);
  });

  it('has the elements', () => {
    const countSet = new CountSet();
    countSet.append(1);
    countSet.append(1);
    countSet.append(3);
    expect(
      countSet.complement([
        [1, 4],
        [2, 2],
      ])
    ).toStrictEqual([[3, 1]]);
  });
});

describe('resultAll', () => {
  it('general', () => {
    const countSet = new CountSet();
    countSet.append(1);
    countSet.append(1);
    countSet.append(2);
    countSet.sum([[1, 2]]);
    expect(countSet.resultAll()).toStrictEqual([
      { element: 1, count: 2 },
      { element: 2, count: 1 },
    ]);
  });
});

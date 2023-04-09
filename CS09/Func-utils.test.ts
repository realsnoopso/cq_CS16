import { map, filter } from './Func-utils';

describe('map', () => {
  it('sum', () => {
    const testMap = () =>
      map<number>(
        [1, 2, 3],
        (props: number[]) => {
          const [pre, a] = props;
          return pre + a;
        },
        [1]
      );
    expect(testMap()).toStrictEqual([2, 3, 4]);
  });

  it('join string', () => {
    const testMap = () =>
      map<string>(
        ['snoop', 'a dog'],
        (props: string[]) => {
          const [pre, a, b] = props;
          return `${a} ${b} ${pre}`;
        },
        ['I', 'am']
      );
    expect(testMap()).toStrictEqual(['I am snoop', 'I am a dog']);
  });
});

describe('filter', () => {
  it('general', () => {
    const testFilter = () =>
      filter<number>(
        [1, 2, -1],
        (props: number[]) => {
          const [pre, a] = props;
          return pre > a;
        },
        [0]
      );
    expect(testFilter()).toStrictEqual([1, 2]);
  });

  it('has not intersection', () => {
    const testFilter = () =>
      filter<number>(
        [1, 2],
        (props: number[]) => {
          const [pre, a] = props;
          return pre > a;
        },
        [4]
      );
    expect(testFilter()).toStrictEqual([]);
  });
});

export const map = <T>(arr: T[], func: (props: T[]) => T, props: T[]) => {
  let result: T[] = [];
  arr.forEach((element) => {
    const temp = [element, ...props];
    const newElement = func(temp);
    if (newElement) result.push(newElement);
  });
  return result;
};

export const filter = <T>(
  arr: T[],
  func: (props: T[]) => boolean,
  props: T[]
) => {
  let result: T[] = [];
  arr.forEach((element) => {
    const temp = [element, ...props];
    const compare = func(temp);
    if (compare) result.push(element);
  });
  return result;
};

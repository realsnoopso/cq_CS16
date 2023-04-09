type Set = number[];

export const squadSet = (newSet?: Set) => {
  const set: Set = newSet ? newSet : [];
  return Object.freeze({});
};

const sum = (set: Set, other: Set) => {
  const diff = complement(set, other);
  if (diff) return [...set, ...diff];
  else return set;
};

const complement = (set: Set, other: Set) => {
  const diff: Set = [];
  other.forEach((num: number) => {
    if (!set.includes(num)) return diff.push(num);
  });
  return diff;
};

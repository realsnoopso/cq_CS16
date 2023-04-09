type Set = number[];

export class SquadSet {
  #set: Set = [];

  constructor(set: Set) {
    this.#set = set;
  }

  sum(other: Set) {
    // TC: O(n2)
    const set = this.#set;
    const diff = this.complement(other);
    if (diff) return [...set, ...diff];
    else return set;
  }

  complement(other: Set) {
    // TC: O(n2)
    const set = this.#set;
    const diff: Set = [];
    other.forEach((num: number) => {
      if (!set.includes(num)) return diff.push(num);
    });
    return diff;
  }

  intersect(other: Set) {
    // TC: O(n)
    const set = this.#set;
    const same: Set = [];
    other.forEach((num: number) => {
      if (set.includes(num)) return same.push(num);
    });
    if (same) return same;
    else return [];
  }

  resultAll() {
    const set = this.#set;
    return set;
  }
}

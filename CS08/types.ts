export type NumberClassifier = {
  [Key in NumberClassifierKeys]: (number: number) => boolean;
};

type NumberClassifierKeys =
  | 'perfect'
  | 'abundant'
  | 'deficient'
  | 'prime'
  | 'squared';

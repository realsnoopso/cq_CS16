export type MenuNameType = string[];
export type MenusType = { name: string; time: number }[];

export type Request = number[][];

export interface OrderedDrinkType {
  id: number;
  orderId: number;
  isDone: boolean;
}

export interface OrderType {
  id: number;
  request: Request;
  orderedDrinks: OrderedDrinkType[];
  generate: (menu: Request, orderId: number) => OrderType;
}

export interface WaitingListType {
  queue: OrderedDrinkType[];
  orderSize: number;
  getOrderSize: () => void;
  enqueue: (order: OrderedDrinkType) => void;
  dequeue: () => OrderedDrinkType | undefined;
  size: () => number;
  checkDone: (id: number, orderId: number) => void;
}

export interface WaiterType {
  takeOrder: (menu: Request) => void;
  checkMenu: (menu: Request) => boolean;
  updateWaitingList: (order: OrderType) => void;
  printWaitingList: () => void;
}

export interface BaristaType {
  isWorking: boolean;
  name: string;

  hire: (name: string) => void;
  startMaking: (orderDrinks: OrderedDrinkType[], orderEvent: any) => void;
  makeDrink: (orderDrink: OrderedDrinkType) => Promise<unknown> | null;
  checkOrder: (
    orderDrinks: OrderedDrinkType[]
  ) => '' | Promise<unknown> | null | undefined;
}

export interface ManagerType {
  intervalId: any;
  isWaiting: boolean;
  lastOrderedBarista: number;
  startWork: () => void;
  closeCafe: () => void;
  checkWaitingList: () => OrderType | void;
  deliverOrder: (orderDrinks: OrderedDrinkType[]) => void;
  checkBaristas: () => BaristaType | undefined;
  isBaristasWorking: () => boolean;
}

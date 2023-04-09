import { WaitingListType, OrderedDrinkType } from './types';

const WaitingList: WaitingListType = {
  queue: [] as OrderedDrinkType[],
  orderSize: 0,

  getOrderSize: function () {
    this.orderSize++;
    return this.orderSize;
  },

  checkDone: function (id: number, orderId: number) {
    const index = this.queue.findIndex((drink: OrderedDrinkType) => {
      return drink.id === id;
    });

    if (index === -1) return console.error(id, '잘못된 주문입니다.');
    this.queue[index].isDone = true;
  },

  enqueue: function (order: OrderedDrinkType) {
    if (order) this.queue.push(order);
  },

  dequeue: function () {
    const order = this.queue[0];
    return this.queue.shift();
  },

  size: function () {
    return this.queue.length;
  },
};

const waitingList = Object.create(WaitingList);
export default waitingList;

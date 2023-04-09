import waitingList from './WaitingList';
import { Request, OrderType, OrderedDrinkType } from './types';

const Order: OrderType = {
  id: 0,
  request: [] as Request,
  orderedDrinks: [] as OrderedDrinkType[],

  generate: function (request: Request, orderId: number) {
    this.id = orderId;
    this.request = request;

    const orderedDrinks = [] as OrderedDrinkType[];
    request.forEach((item) => {
      for (let i = 0; i < item[1]; i++) {
        item[0] && orderedDrinks.push({ id: item[0], orderId, isDone: false });
      }
    });
    this.orderedDrinks = orderedDrinks;

    return this as OrderType;
  },
};

export default Order;

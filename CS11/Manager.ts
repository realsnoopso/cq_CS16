import waitingList from './WaitingList';
import EventEmitter from 'events';
import { baristarSusan } from './Baristar';
import { ManagerType, OrderType, OrderedDrinkType } from './types';
import cafe from './Cafe';
import menu from './Menu';
import { BASE_TIME } from './constants';
import { baristars } from './Baristar';

const Manager: ManagerType = {
  intervalId: null,
  isWaiting: false,
  lastOrderedBarista: 0,
  startWork: function () {
    this.intervalId = setInterval(() => {
      this.checkWaitingList();
    }, BASE_TIME);
  },

  closeCafe: function () {
    setTimeout(() => {
      if (waitingList.size() <= 0 && baristarSusan.isWorking === false) {
        console.error('주문이 없습니다. 영업을 종료합니다.');
        clearInterval(this.intervalId);
        cafe.close();
      }
    }, 3 * BASE_TIME);
  },

  checkBaristas: function () {
    const availableBarista = baristars[this.lastOrderedBarista];
    // console.log({ availableBarista: availableBarista?.name });
    return availableBarista;
  },

  isBaristasWorking: () => baristars.some((barista) => barista.isWorking),

  checkWaitingList: function () {
    if (
      !this.isWaiting &&
      waitingList.size() <= 0 &&
      this.isBaristasWorking() === false
    ) {
      this.isWaiting = true;
      return this.closeCafe();
    }

    if (this.isBaristasWorking()) return;

    const orderDrinks = [] as OrderedDrinkType[];
    waitingList.queue.length !== 0 &&
      console.log(
        '/' +
          waitingList.queue
            .map((order: OrderType) => {
              const { id } = order;
              return menu[id - 1].name;
            })
            .join(',') +
          '/'
      );
    const orderA: OrderedDrinkType = waitingList.dequeue();
    const orderB: OrderedDrinkType = waitingList.dequeue();

    orderA && orderDrinks.push(orderA);
    orderB && orderDrinks.push(orderB);
    this.deliverOrder(orderDrinks);
  },

  deliverOrder: function (orderDrinks: OrderedDrinkType[]) {
    const orderEvent = new EventEmitter();
    const availableBarista = this.checkBaristas();
    this.lastOrderedBarista =
      baristars.length === this.lastOrderedBarista + 1
        ? 0
        : this.lastOrderedBarista + 1;
    if (availableBarista) {
      availableBarista.startMaking(orderDrinks, orderEvent);
      orderEvent.emit('order');
    }
  },
};

export const managerBob = Object.create(Manager);

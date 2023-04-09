import { OrderType, BaristaType, Request, OrderedDrinkType } from './types';
import EventEmitter from 'events';
import menu from './Menu';
import { BASE_TIME } from './constants';
import waitingList from './WaitingList';

const Baristar: BaristaType = {
  isWorking: false,
  name: '',

  hire: function (name: string) {
    this.name = name;
    this.isWorking = false;
  },

  startMaking: function (orderDrinks: OrderedDrinkType[], orderEvent: any) {
    if (this.isWorking) return;

    orderEvent.on('order', async () => {
      this.isWorking = true;
      const result = await this.checkOrder(orderDrinks);
      if (result) {
        console.log(`${this.name}: 모든 음료가 완성 되었습니다`);
      }
      this.isWorking = false;
    });
  },

  makeDrink: function (orderDrink: OrderedDrinkType) {
    const name = menu[orderDrink.id - 1].name;
    const time = menu[orderDrink.id - 1].time;
    console.log(`${this.name}: ${name} 시작`);
    if (name === undefined) return null;
    const { id, orderId } = orderDrink;
    // waitingList.checkDone(id, orderId);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(name);
      }, time * BASE_TIME);
    });
  },

  checkOrder: async function (orderDrinks: OrderedDrinkType[]) {
    if (orderDrinks.length === 0) return null;
    const first = orderDrinks[0];
    const second = orderDrinks[1];

    if (first) {
      const name = await this.makeDrink(orderDrinks[0]);
      console.log(`${this.name}: ${name} 완성`);
    }

    if (second) {
      const name = await this.makeDrink(orderDrinks[1]);
      console.log(`${this.name}: ${name} 완성`);
    }

    return new Promise((resolve) => resolve(orderDrinks));
  },
};

export const baristarSusan = Object.create(Baristar);
baristarSusan.hire('Susan');
export const baristarPaul = Object.create(Baristar);
baristarPaul.hire('Paul');

export const baristars = [baristarSusan, baristarPaul];

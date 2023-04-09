import Order from './Order';
import waitingList from './WaitingList';
import menu from './Menu';
import { Request, OrderType, WaiterType } from './types';
import { baristars } from './Baristar';

const Waiter: WaiterType = {
  takeOrder: function (request: Request) {
    if (!this.checkMenu(request)) {
      return console.error('메뉴에 없는 항목이 있습니다.');
    }
    const order = Object.create(Order);
    const orderId = waitingList.getOrderSize();
    order.generate(request, orderId);
    this.updateWaitingList(order);
    console.log('주문이 접수되었습니다.', orderId, '번 주문입니다.');
    // this.printWaitingList();
  },

  printWaitingList: function () {
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
  },

  checkMenu: (orderedMenu: Request) => {
    const isInMenu = orderedMenu.some((item) => item[0] < menu.length);
    return isInMenu;
  },

  updateWaitingList: (order: OrderType) => {
    order.orderedDrinks.forEach((drink) => {
      waitingList.enqueue(drink);
    });
  },
};

export const waiterJohn = Object.create(Waiter);
export const waiterMarry = Object.create(Waiter);

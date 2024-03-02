import { Order, } from "../types/orders"; // Assuming the types are defined in a file named 'order'

const ORDERS: Order[] = [];


export const getOrders = (): Order[] => ORDERS;

export const getOrder = (id: string): Order | undefined => {
  return ORDERS.find((order) => order.id === id);
};

export const insertOrder = (order: Order): Order => {
  ORDERS.push(order);
  return order;
};

export const updateOrder = (order: Order): Order | undefined => {
  const index = ORDERS.findIndex((o) => o.id === order.id);

  if (index < 0) {
    return undefined;
  }

  ORDERS[index] = order;

  return order;
};

export const deleteOrder = (id: string): Order | undefined => {
  const index = ORDERS.findIndex((o) => o.id === id);

  if (index < 0) {
    return undefined;
  }

  return ORDERS.splice(index, 1)[0];
};


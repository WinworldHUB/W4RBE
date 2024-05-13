import { Order, OrderStatus } from "../awsApis";

export const trimOrder = (order: Order, isTrimId: boolean = false): unknown => {
  if (!isTrimId) {
    return {
      id: order.id,
      orderDate: order.orderDate,
      orderNumber: order.orderNumber,
      deliveryDetails: order.deliveryDetails,
      orderValue: order.orderValue,
      packagingType: order.packagingType,
      products: order.products,
      status: order.status,
      trackingNumber: order.trackingNumber,
      trackingStatus: order.trackingStatus,
      memberId: order.memberId,
    };
  }

  return {
    orderDate: order.orderDate,
    orderNumber: order.orderNumber,
    deliveryDetails: order.deliveryDetails,
    orderValue: order.orderValue,
    packagingType: order.packagingType,
    products: order.products,
    status: order.status,
    trackingNumber: order.trackingNumber,
    trackingStatus: order.trackingStatus,
    memberId: order.memberId,
  };
};

export const getOrderStatus = (status: OrderStatus): string => {
  if (status === OrderStatus.PROCESSING) return "ORDER SHIPPED";
  if (status === OrderStatus.DONE) return "DELIVERED";

  return status.toString();
};

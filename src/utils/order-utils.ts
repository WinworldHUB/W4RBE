import { Order } from "../awsApis";

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

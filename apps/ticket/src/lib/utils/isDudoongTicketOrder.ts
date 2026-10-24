import type { OrderMethod } from '@lib/apis/order/orderType';

/** 백엔드 Order.isDudoongTicketOrder()와 같은 기준: 승인 방식이면서 결제금액이 있는 주문 */
export const isDudoongTicketOrder = (
  orderMethod: OrderMethod,
  totalAmount?: string,
) =>
  orderMethod === '승인 방식' &&
  parseFloat(totalAmount?.replace(/[^\d.-]/g, '') ?? '0') > 0;

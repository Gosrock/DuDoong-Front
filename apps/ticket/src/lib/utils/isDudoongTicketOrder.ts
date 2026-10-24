import type { OrderMethod } from '@lib/apis/order/orderType';

const parseAmount = (amount?: string) =>
  parseFloat(amount?.replace(/[^\d.-]/g, '') ?? '0') || 0;

/** 백엔드 Order.isDudoongTicketOrder()와 같은 기준: 승인 방식이면서 결제금액이 있는 주문 */
export const isDudoongTicketOrder = (
  orderMethod: OrderMethod,
  totalAmount?: string,
) => orderMethod === '승인 방식' && parseAmount(totalAmount) > 0;

/** 결제금액이 없는 주문 (무료티켓) */
export const isFreeOrder = (totalAmount?: string) =>
  parseAmount(totalAmount) <= 0;

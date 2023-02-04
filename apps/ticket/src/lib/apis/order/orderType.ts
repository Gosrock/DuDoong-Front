import { OptionAnswer } from '../cart/cartType';
import { TicketType } from '../ticket/ticketType';

export interface CreateOrderRequest {
  couponId: number | null;
  cartId: number;
}

export interface CreateOrderResponse {
  orderId: string;
  orderName: string;
  customerEmail: string;
  customerName: string;
  amount: string;
  isNeedPayment: boolean;
  orderMethod: OrderMethod;
  ticketType: TicketType;
}

export interface ConfirmOrderRequest {
  paymentKey: string;
  amount: number;
}

export interface OrderResponse {
  paymentInfo: OrderPaymentResponse;
  tickets: OrderLineTicketResponse;
  refundInfo: RefundInfo;
  orderUuid: string;
  orderId: number;
  orderMethod: OrderMethod;
  ticketType: TicketType;
}

/**
 * 결제정보
 */
export interface OrderPaymentResponse {
  paymentMethod: string;
  provider: string;
  supplyAmount: string;
  discountAmount: string;
  couponName: string;
  totalAmount: string;
  orderStatus: OrderStatus;
  receiptUrl: string;
}

/**
 * 예매정보 (티켓목록)
 */
export interface OrderLineTicketResponse {
  ticketName: string;
  orderNo: string;
  ticketNos: string;
  paymentAt: string;
  userName: string;
  orderLinePrice: string;
  purchaseQuantity: number;
  answers: OptionAnswer;
}

/**
 * 예매취소 정보
 */
interface RefundInfo {
  endAt: string;
  available: boolean;
}

export type OrderMethod = '승인 방식' | '결제 방식';

export type OrderStatus =
  | '주문 생성상태'
  | '결제 대기중'
  | ' 승인 대기중'
  | ' 결제 시간 만료'
  | ' 결제 완료'
  | ' 승인 완료'
  | ' 환불 완료'
  | ' 취소된 결제'
  | ' 결제 실패';

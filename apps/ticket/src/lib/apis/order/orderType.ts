import { OptionAnswer } from '../cart/cartType';

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
  orderMethod: 'APPROVAL' | 'PAYMENT';
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
  orderStatus:
    | 'READY'
    | 'PENDING_PAYMENT'
    | 'PENDING_APPROVE'
    | 'OUTDATED'
    | 'CONFIRM'
    | 'APPROVED'
    | 'REFUND'
    | 'CANCELED'
    | 'FAILED';
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

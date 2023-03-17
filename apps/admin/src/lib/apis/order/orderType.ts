import { OptionGroupType } from '../option/optionType';

export interface GetOrdersRequest {
  orderStage: 'APPROVE_WAITING' | 'CONFIRMED';
  searchType?: 'PHONE' | 'NAME';
  searchString?: string;
  page: number;
  size?: number;
  eventId: string;
}

export interface PageResponseOrderAdminTableElement {
  content: OrderAdminTableElement[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface OrderAdminTableElement {
  refundInfo: RefundInfo;
  userInfoVo: UserInfo;
  orderUuid: string;
  orderNo: string;
  orderStatus: OrderStatus;
  orderName: string;
  createdAt: string;
  withDrawAt: string;
  approveAt: string;
  totalQuantity: number;
  totalPaymentPrice: string;
}

export interface UserInfo {
  userId: number;
  userName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  createdAt: string;
}
interface RefundInfo {
  endAt: string;
  available: boolean;
}

export type OrderStatus =
  | '주문 생성상태'
  | '결제 대기중'
  | '승인 대기중'
  | '결제 시간 만료'
  | '결제 완료'
  | '승인 완료'
  | '환불 완료'
  | '취소된 결제'
  | '결제 실패';

//-------------

export interface PatchOrderApproveRequest {
  eventId: number | string;
  order_uuid: string;
}

//-------

/**
 * POST confirm (결제확인하기)
 */
export interface OrderResponse {
  paymentInfo: OrderPaymentResponse;
  tickets: OrderLineTicketResponse[];
  refundInfo: RefundInfo;
  eventProfile: EventProfile;
  orderUuid: string;
  orderNo: number;
  orderMethod: OrderMethod;
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
  answers: OptionAnswer[];
  eachOptionPrice: string;
}

/**
 * 예매취소 정보
 */
interface RefundInfo {
  endAt: string;
  available: boolean;
}

/**
 * 이벤트 프로필 정보
 */
interface EventProfile {
  eventId: number;
  posterImage: string;
  name: string;
  startAt: string;
  endAt: string;
  runTime: number;
  placeName: string;
  status: EventStatus;
}
export type EventStatus = '준비중' | '진행중' | '정산중' | '지난공연';
export type OrderMethod = '승인 방식' | '결제 방식';

export interface OptionAnswer {
  optionGroupType: OptionGroupType;
  questionName: string;
  questionDescription: string;
  answer: string;
  additionalPrice: string;
}

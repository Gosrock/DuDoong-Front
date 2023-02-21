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
  | ' 승인 대기중'
  | ' 결제 시간 만료'
  | ' 결제 완료'
  | ' 승인 완료'
  | ' 환불 완료'
  | ' 취소된 결제'
  | ' 결제 실패';

//-------------

export interface PatchOrderApproveRequest {
  eventId: number | string;
  order_uuid: string;
}

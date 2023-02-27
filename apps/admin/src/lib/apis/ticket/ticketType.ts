export interface GetTicketDetailResponse {
  ticketItems: TicketDetailResponse[];
}

export interface TicketDetailResponse {
  ticketItemId: number;
  payType: payType;
  ticketName: string;
  description: string;
  price: string;
  approveType: approveType;
  purchaseLimit: number;
  supplyCount: number;
  quantity: number;
  isQuantityPublic: boolean;
}

export type payType = '두둥티켓' | '무료티켓' | '유료티켓';

type approveType = '선착순' | '승인';

export interface CreateTicketRequest {
  payType: payType;
  ticketName: string;
  description: string;
  price: string;
  approveType: approveType;
  purchaseLimit: number;
  supplyCount: number;
  quantity: number;
  isQuantityPublic: boolean;
}

export interface PageResponseIssuedTicketAdminTableElement {
  content: IssuedTicketAdminTableElement[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface IssuedTicketAdminTableElement {
  issuedTicketId: number;
  issuedTicketNo: string;
  orderNo: string;
  uuid: string;
  ticketName: string;
  payType: payType;
  ticketPrice: string;
  createdAt: string;
  enteredAt: string;
  issuedTicketStatus: IssuedTicketStatus;
  optionPrice: string;
  userInfo: IssuedTicketUserInfo;
  issuedTicketOptionAnswers: IssuedTicketOptionAnswer[];
}

export type IssuedTicketStatus = '입장 완료' | '입장 전' | '취소 티켓';

interface IssuedTicketUserInfo {
  userId: number;
  userName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  createdAt: string;
}

export interface IssuedTicketOptionAnswer {
  issuedTicketOptionAnswerId: number;
  optionQuestion: string;
  answer: string;
  additionalPrice: string;
}

export interface GetIssuedTicketRequest {
  eventId: string;
  page: number;
  size?: number;
  searchType?: 'PHONE' | 'NAME';
  searchString?: string;
}

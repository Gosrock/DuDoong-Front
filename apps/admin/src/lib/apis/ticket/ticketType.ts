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

export interface RetrieveIssuedTicketListResponse {
  page: number;
  totalPage: number;
  issuedTickets: RetrieveIssuedTicket[];
}

export interface RetrieveIssuedTicket {
  issuedTicketInfo: IssuedTicketInfo[];
  issuedTicketOptionAnswers: IssuedTicketOptionAnswer[];
}

interface IssuedTicketInfo {
  issuedTicketId: number;
  issuedTicketNo: string;
  uuid: string;
  ticketName: string;
  ticketPrice: string;
  createdAt: string;
  issuedTicketStatus: IssuedTicketStatus;
  optionPrice: string;
  userInfo: IssuedTicketUserInfo;
}

export type IssuedTicketStatus = '입장 완료' | '입장 전' | '취소 티켓';

interface IssuedTicketUserInfo {
  userId: number;
  userName: string;
  phoneNumber: string;
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
  userName?: string;
  phoneNumber?: string;
}

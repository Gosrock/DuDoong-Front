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

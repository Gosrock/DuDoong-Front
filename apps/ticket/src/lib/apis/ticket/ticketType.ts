export interface GetEventTicketItemsResponse {
  ticketItems: TicketItemResponse[];
}

export interface TicketItemResponse {
  ticketItemId: number;
  ticketName: string;
  description: string;
  price: string;
  type: TicketType;
  purchaseLimit: number;
  supplyCount: number;
  quantity: number;
}

export type TicketType = '선착순' | '승인';

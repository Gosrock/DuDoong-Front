import { OptionGroupType } from '../cart/cartType';

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

export interface GetTicketItemOptionsResponse {
  optionGroups: OptionGroupResponse[];
}

export interface OptionGroupResponse {
  optionGroupId: number;
  type: OptionGroupType;
  name: string;
  description: string;
  options: OptionResponse[];
}

export interface OptionResponse {
  optionId: number;
  answer: string;
  additionalPrice: string;
}

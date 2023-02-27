import { EventStatus } from '@dudoong/utils';
import type { OptionGroupType } from '../cart/cartType';
import type { IssuedTicketInfo } from '../order/orderType';

/*
 * GET /v1/events/{eventId}/ticketItems 해당 이벤트의 티켓 조회
 */
export interface GetEventTicketItemsResponse {
  ticketItems: TicketItemResponse[];
}

export interface TicketItemResponse {
  ticketItemId: number;
  payType: PayType;
  ticketName: string;
  description: string;
  price: string;
  approveType: ApproveType;
  purchaseLimit: number;
  supplyCount: number;
  quantity: number;
  isQuantityPublic: boolean;
}
export type PayType = '두둥티켓' | '무료티켓' | '유료티켓';
export type ApproveType = '선착순' | '승인';

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

export interface RetrievedIssuedTicketDetailResponse {
  issuedTicketInfo: IssuedTicketInfo;
  eventInfo: EventInfo;
}

export interface EventInfo {
  eventName: string;
  posterImage: string;
  content: string;
  startAt: string;
  endAt: string;
  latitude: number;
  longitude: number;
  placeName: string;
  placeAddress: string;
  eventStatus: EventStatus;
}

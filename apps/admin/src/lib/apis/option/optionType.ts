export type OptionGroupType = '객관식' | 'Y/N' | '주관식';

export interface CreateTicketOptionRequest {
  type: OptionGroupType;
  name: string;
  description: string;
  additionalPrice?: number;
}
export interface ApplyTicketOptionRequest {
  optionGroupId: number;
}
/**
 * 티켓 상품에 달린 옵션들
 */
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

/**
 * 이벤트에 속하는 옵션들
 */
export interface GetEventOptionsResponse {
  optionGroups: OptionGroupResponse[];
}

/**
 * 해당 이벤트에 속하는 티켓상품들에 속하는 옵션들
 */
export interface GetAppliedOptionGroupsResponse {
  appliedOptionGroups: AppliedOptionGroupsResponse[];
}

export interface AppliedOptionGroupsResponse {
  ticketItemId: number;
  ticketName: string;
  optionGroups: OptionGroupResponse[];
}

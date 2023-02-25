import { ApproveType, PayType } from '../ticket/ticketType';

export interface AddCartRequest {
  items: AddCartLineDto[];
}

export interface AddCartLineDto {
  itemId: number;
  quantity: number;
  options: AddCartOptionAnswer[];
}
[];

export interface AddCartOptionAnswer {
  optionId: number;
  answer: string;
}

export interface AddCartResponse {
  title: string;
  items: CartItemResponse[];
  totalPrice: string;
  cartId: number;
  totalQuantity: number;
  isNeedPayment: boolean;
  approveType: ApproveType;
  ticketPayType: PayType;
  accountInfo: AccountInfo;
}

export interface AccountInfo {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}
export interface CartItemResponse {
  name: string;
  answers: OptionAnswer[];
  itemprice: string;
  cartLinePrice: string;
  packedQuantity: number;
  eachOptionPrice: string;
}

export interface OptionAnswer {
  optionGroupType: OptionGroupType;
  questionName: string;
  questionDescription: string;
  answer: string;
  additionalPrice: string;
}

export type OptionGroupType = 'Y/N' | '객관식' | '주관식';

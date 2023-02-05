export interface AddCartRequest {
  items: {
    itemId: number;
    quantity: number;
    options: AddCartOptionAnswer[];
  }[];
}

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
}

export interface CartItemResponse {
  name: string;
  answers: OptionAnswer[];
  itemprice: string;
  cartLinePrice: string;
  packedQuantity: number;
}

export interface OptionAnswer {
  optionGroupType: OptionGroupType;
  questionName: string;
  questionDescription: string;
  answer: string;
  additionalPrice: string;
}

export type OptionGroupType = 'Y/N' | ' 객관식' | '주관식';

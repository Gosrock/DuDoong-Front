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
  optionGroupType: 'TRUE_FALSE' | 'MULTIPLE_CHOICE' | 'SUBJECTIVE';
  questionName: string;
  questionDescription: string;
  answer: string;
  additionalPrice: string;
}

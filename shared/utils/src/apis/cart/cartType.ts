export interface AddCartRequest {
  itemId: number;
  quantity: number;
  options: AddCartOptionAnswer[];
}

export interface AddCartOptionAnswer {
  optionId: number;
  answer: string;
}

export interface AddCartResponse {
  title: string;
  items: CartItemResponse;
  cartId: number;
  totalQuantity: number;
  isNeedPayment: boolean;
}

export interface CartItemResponse {
  name: string;
  answers: OptionAnswers;
  itemprice: string;
  cartLinePrice: string;
  packedQuantity: number;
}

export interface OptionAnswers {
  optionGroupType: 'TRUE_FALSE' | 'MULTIPLE_CHOICE' | 'SUBJECTIVE';
  questinoName: string;
  questionDescription: string;
  answer: string;
  additionalPrice: string;
}

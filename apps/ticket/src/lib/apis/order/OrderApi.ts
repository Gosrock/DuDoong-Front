import { axiosPrivate } from '../axios';
import {
  ConfirmOrderRequest,
  CreateOrderRequest,
  CreateOrderResponse,
  OrderResponse,
} from './orderType';

export const OrderApi = {
  CREATE_ORDER: async (
    payload: CreateOrderRequest,
  ): Promise<CreateOrderResponse> => {
    const response = await axiosPrivate.post('/orders/', payload);
    return response.data.data;
  },

  CONFIRM_ORDER:
    (orderId: string) =>
    async (payload: ConfirmOrderRequest): Promise<OrderResponse> => {
      const response = await axiosPrivate.post(
        `/orders/${orderId}/confirm`,
        payload,
      );
      return response.data.data;
    },
};

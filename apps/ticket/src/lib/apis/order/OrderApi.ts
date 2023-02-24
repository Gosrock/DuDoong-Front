import { axiosPrivate } from '../axios';
import type {
  ConfirmOrderRequest,
  CreateOrderRequest,
  CreateOrderResponse,
  OrderResponse,
  OrderTicketResponse,
} from './orderType';

export const OrderApi = {
  CREATE_ORDER: async (
    payload: CreateOrderRequest,
  ): Promise<CreateOrderResponse> => {
    const response = await axiosPrivate.post('/orders/', payload);
    return response.data.data;
  },

  CONFIRM_ORDER:
    (order_uuid: string) =>
    async (payload: ConfirmOrderRequest): Promise<OrderResponse> => {
      const response = await axiosPrivate.post(
        `/orders/${order_uuid}/confirm`,
        payload,
      );
      return response.data.data;
    },

  GET_ORDERS_TICKETS: async (
    order_uuid: string,
  ): Promise<OrderTicketResponse> => {
    const response = await axiosPrivate.get(`orders/${order_uuid}/tickets`);
    return response.data.data;
  },
};

import { InfiniteRequest, InfiniteResponse } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import type {
  ConfirmOrderRequest,
  CreateOrderRequest,
  CreateOrderResponse,
  OrderListResponse,
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
  GET_ORDERS: async (
    { pageParam, size = 10, sort = 'asc' }: InfiniteRequest,
    isShowing: boolean,
  ): Promise<InfiniteResponse<OrderListResponse>> => {
    const response = await axiosPrivate.get(
      `/orders/?showing=${isShowing}&page=${pageParam}&size=${size}&sort=${sort}`,
    );
    return response.data.data;
  },
  GET_RECENT_ORDER: async (): Promise<OrderListResponse> => {
    const response = await axiosPrivate.get(`/orders/recent`);
    return response.data.data;
  },
};

import { InfiniteRequest, InfiniteResponse } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import type {
  ConfirmOrderRequest,
  CreateOrderRequest,
  CreateOrderResponse,
  OrderListResponse,
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

  POST_ORDER_FREE: async (order_uuid: string): Promise<CreateOrderResponse> => {
    const response = await axiosPrivate.post(`/orders/${order_uuid}/free`);
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
  GET_ORDERS_DETAIL: async (order_uuid: string): Promise<OrderResponse> => {
    const response = await axiosPrivate.get(`orders/${order_uuid}/`);
    return response.data.data;
  },
  GET_ORDERS_TICKETS: async (
    order_uuid: string,
  ): Promise<OrderTicketResponse> => {
    const response = await axiosPrivate.get(`orders/${order_uuid}/tickets`);
    return response.data.data;
  },
  POST_REFUND: async (order_uuid: string): Promise<OrderResponse> => {
    const response = await axiosPrivate.post(`orders/${order_uuid}/refund`);
    return response.data.data;
  },
};

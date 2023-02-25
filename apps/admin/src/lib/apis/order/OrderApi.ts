import { axiosPrivate } from '../axios';
import {
  GetOrdersRequest,
  OrderResponse,
  PageResponseOrderAdminTableElement,
  PatchOrderApproveRequest,
} from './orderType';

const OrderApi = {
  GET_ORDERS: async ({
    orderStage,
    searchType,
    searchString,
    page,
    size = 10,
    eventId,
  }: GetOrdersRequest): Promise<PageResponseOrderAdminTableElement> => {
    const searchTypeParam = searchType
      ? `&searchType=${encodeURIComponent(searchType)}`
      : '';
    const searchStringParam = searchString
      ? `&searchString=${encodeURIComponent(searchString)}`
      : '';
    const response = await axiosPrivate.get(
      `/events/${eventId}/orders?orderStage=${orderStage}${searchTypeParam}${searchStringParam}&page=${page}&size=${size}`,
    );
    return response.data.data;
  },

  POST_ORDER_APPROVE: async ({
    eventId,
    order_uuid,
  }: PatchOrderApproveRequest) => {
    const response = await axiosPrivate.post(
      `/events/${eventId}/orders/${order_uuid}/approve`,
    );
    return response.data.data;
  },

  GET_ORDER_DETAIL: async ({
    eventId,
    order_uuid,
  }: PatchOrderApproveRequest): Promise<OrderResponse> => {
    const response = await axiosPrivate.get(
      `/events/${eventId}/orders/${order_uuid}`,
    );
    return response.data.data;
  },
};

export default OrderApi;

import { axiosPrivate } from '../axios';
import {
  GetOrdersRequest,
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
    const searchTypeParam = searchType ? `&searchType=${searchType}` : '';
    const response = await axiosPrivate.get(
      `/events/${eventId}/orders?orderStage=${orderStage}${searchTypeParam}&searchString=${searchString}&page=${page}&size=${size}`,
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
};

export default OrderApi;

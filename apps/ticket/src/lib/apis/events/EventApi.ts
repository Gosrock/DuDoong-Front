import { InfiniteRequest, InfiniteResponse } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import { EventResponse, getEventsRequest } from './eventType';

export const EventApi = {
  GET_EVENTS_SEARCH: async ({
    keyword,
    pageParam,
    size,
  }: getEventsRequest): Promise<InfiniteResponse<EventResponse>> => {
    console.log();
    const response = await axiosPrivate.get(
      `/events/search?keyword=${keyword}&page=${pageParam}&size=${size}`,
    );
    return response.data.data;
  },
};

import { axiosPublic, InfiniteResponse } from '@dudoong/utils';
import type { EventResponse, getEventsRequest } from './eventType';

export const EventApi = {
  GET_EVENTS_SEARCH: async ({
    keyword,
    pageParam,
    size,
  }: getEventsRequest): Promise<InfiniteResponse<EventResponse>> => {
    const response = await axiosPublic.get(
      `/events/search?keyword=${keyword}&page=${pageParam}&size=${size}`,
    );
    return response.data.data;
  },
};

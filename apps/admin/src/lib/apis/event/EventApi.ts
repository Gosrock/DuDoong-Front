import { InfiniteRequest, InfiniteResponse } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import {
  BasicEventRequest,
  BasicEventResponse,
  CreateEventRequest,
  CreateEventResponse,
  EventDetailResponse,
  EventProfileResponse,
} from './eventType';

const EventApi = {
  GET_EVENTS: async ({
    pageParam = 0,
    size = 10,
    sort = 'asc',
  }: InfiniteRequest): Promise<InfiniteResponse<EventProfileResponse>> => {
    const response = await axiosPrivate.get(
      `/events?page=${pageParam}&size=${size}&sort=${sort}`,
    );
    return response.data.data;
  },

  GET_EVENT_DETAIL: async (eventId: string): Promise<EventDetailResponse> => {
    const response = await axiosPrivate.get(`events/${eventId}`);
    return response.data.data;
  },

  POST_EVENT: async (
    payload: CreateEventRequest,
  ): Promise<CreateEventResponse> => {
    const response = await axiosPrivate.post(`events`, payload);
    return response.data.data;
  },

  PATCH_EVENT_BASIC: async (
    payload: BasicEventRequest,
    eventId: string,
  ): Promise<BasicEventResponse> => {
    const response = await axiosPrivate.patch(
      `events/${eventId}/basic`,
      payload,
    );
    return response.data.data;
  },
};

export default EventApi;

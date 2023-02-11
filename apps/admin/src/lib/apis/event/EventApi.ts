import { InfiniteRequest, InfiniteResponse } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import {
  CreateEventRequest,
  CreateEventResponse,
  EventDetailResponse,
  EventProfileResponse,
  EventResponse,
  imageFileExtensionType,
  ImageUrlResponse,
  UpdateEventDetailRequest,
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

  POST_EVENT_IMAGE: async ({
    eventId,
    imageFileExtension,
  }: {
    eventId: string;
    imageFileExtension: imageFileExtensionType;
  }): Promise<ImageUrlResponse> => {
    const response = await axiosPrivate.post(
      `/events/${eventId}/images?imageFileExtension=${imageFileExtension}`,
    );
    return response.data.data;
  },

  PATCH_EVENT_DETAIL: async ({
    eventId,
    payload,
  }: {
    eventId: string;
    payload: UpdateEventDetailRequest;
  }): Promise<EventResponse> => {
    const response = await axiosPrivate.patch(
      `/hosts/${eventId}/details`,
      payload,
    );
    return response.data.data;
  },
};

export default EventApi;

import { InfiniteRequest, InfiniteResponse } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import {
  BasicEventRequest,
  CreateEventRequest,
  CreateEventResponse,
  EventChecklistResponse,
  EventDetailResponse,
  EventProfileResponse,
  DashBoardStatisticResponse,
  EventResponse,
  UpdateEventStatusRequest,
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

  GET_EVENT_CHECKLIST: async (
    eventId: string,
  ): Promise<EventChecklistResponse> => {
    const response = await axiosPrivate.get(`events/${eventId}/checklist`);
    return response.data.data;
  },

  GET_EVENT_STATISTICS: async (
    eventId: string,
  ): Promise<DashBoardStatisticResponse> => {
    const response = await axiosPrivate.get(`events/${eventId}/statistics`);
    return response.data.data;
  },

  PATCH_EVENT_OPEN: async (eventId: string): Promise<EventResponse> => {
    const response = await axiosPrivate.patch(`events/${eventId}/open`);
    return response.data.data;
  },

  PATCH_EVENT_STATUS: async ({
    eventId,
    payload,
  }: {
    eventId: string;
    payload: UpdateEventStatusRequest;
  }): Promise<EventResponse> => {
    const response = await axiosPrivate.patch(
      `events/${eventId}/status`,
      payload,
    );
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
      `/events/${eventId}/details`,
      payload,
    );
    return response.data.data;
  },
  PATCH_EVENT_BASIC: async (
    payload: BasicEventRequest,
    eventId: string,
  ): Promise<EventResponse> => {
    const response = await axiosPrivate.patch(
      `events/${eventId}/basic`,
      payload,
    );
    return response.data.data;
  },
};

export default EventApi;

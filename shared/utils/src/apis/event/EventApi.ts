import { axiosPublic } from '../axios';
import type { EventDetailResponse } from './eventType';

export const EventApi = {
  GET_EVENT_DETAIL: async (eventId: string): Promise<EventDetailResponse> => {
    const response = await axiosPublic.get(`events/${eventId}`);
    return response.data.data;
  },
};

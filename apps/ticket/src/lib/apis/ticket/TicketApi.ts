import { axiosPublic } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import type {
  GetEventTicketItemsResponse,
  GetTicketItemOptionsResponse,
} from './ticketType';

export const TicketApi = {
  GET_TICKETITEMS: async (
    eventId: string,
  ): Promise<GetEventTicketItemsResponse> => {
    const response = await axiosPublic.get(`/events/${eventId}/ticketItems`);
    return response.data.data;
  },

  GET_TICKETITEM_OPTIONS: async (
    eventId: string,
    ticketItemId: number,
  ): Promise<GetTicketItemOptionsResponse> => {
    const response = await axiosPrivate.get(
      `/events/${eventId}/ticketItems/${ticketItemId}/options`,
    );
    return response.data.data;
  },
};

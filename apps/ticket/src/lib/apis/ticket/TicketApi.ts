import { axiosPublic } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import type {
  GetEventTicketItemsResponse,
  GetTicketItemOptionsResponse,
  RetrievedIssuedTicketDetailResponse,
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

  GET_ISSUEDTICKETS: async (
    uuid: string,
  ): Promise<RetrievedIssuedTicketDetailResponse> => {
    const response = await axiosPrivate.get(`/issuedTickets/${uuid}`);
    return response.data.data;
  },
};

import { axiosPublic } from '@dudoong/utils';
import { GetEventTicketItemsResponse } from './ticketType';

export const TicketApi = {
  GET_TICKETITEMS: async (
    eventId: string,
  ): Promise<GetEventTicketItemsResponse> => {
    const response = await axiosPublic.get(`/events/${eventId}/ticketItems`);
    return response.data.data;
  },
};

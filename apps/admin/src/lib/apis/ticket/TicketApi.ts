import { axiosPrivate } from '../axios';
import { CreateTicketRequest, GetTicketDetailResponse } from './ticketType';

const TicketApi = {
  GET_TICKET_DETAIL: async (
    eventId: string,
  ): Promise<GetTicketDetailResponse> => {
    const response = await axiosPrivate.get(`events/${eventId}/ticketItems`);
    return response.data.data;
  },

  POST_TICKET: async ({
    eventId,
    payload,
  }: {
    eventId: string;
    payload: CreateTicketRequest;
  }): Promise<GetTicketDetailResponse> => {
    const response = await axiosPrivate.post(
      `events/${eventId}/ticketItems`,
      payload,
    );
    return response.data.data;
  },
};

export default TicketApi;

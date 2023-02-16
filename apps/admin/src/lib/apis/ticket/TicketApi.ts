import { axiosPrivate } from '../axios';
import { GetTicketDetailResponse } from './ticketType';

const TicketApi = {
  GET_TICKET_DETAIL: async (
    eventId: string,
  ): Promise<GetTicketDetailResponse> => {
    const response = await axiosPrivate.get(`events/${eventId}/ticketItems`);
    return response.data.data;
  },
};

export default TicketApi;

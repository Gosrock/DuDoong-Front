import { axiosPrivate } from '../axios';
import {
  CreateTicketRequest,
  GetIssuedTicketRequest,
  GetTicketDetailResponse,
  PageResponseIssuedTicketAdminTableElement,
} from './ticketType';

const TicketApi = {
  GET_TICKET_DETAIL: async (
    eventId: string,
  ): Promise<GetTicketDetailResponse> => {
    const response = await axiosPrivate.get(
      `events/${eventId}/ticketItems/admin`,
    );
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

  PATCH_TICKET_DELETE: async ({
    eventId,
    ticketItemId,
  }: {
    eventId: string;
    ticketItemId: number;
  }): Promise<GetTicketDetailResponse> => {
    const response = await axiosPrivate.patch(
      `events/${eventId}/ticketItems/${ticketItemId}`,
    );
    return response.data.data;
  },

  GET_ISSUEDTICKETS: async ({
    eventId,
    page,
    userName,
    phoneNumber,
    size = 10,
  }: GetIssuedTicketRequest): Promise<PageResponseIssuedTicketAdminTableElement> => {
    const userNameParam = userName ? `&userName=${userName}` : '';
    const phoneNumberParam = phoneNumber ? `&phoneNumber=${phoneNumber}` : '';
    const response = await axiosPrivate.get(
      `events/${eventId}/issuedTickets?page=${page}${userNameParam}${phoneNumberParam}&size=${size}`,
    );
    return response.data.data;
  },
};

export default TicketApi;

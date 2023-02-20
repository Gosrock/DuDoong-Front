import { axiosPrivate } from '../axios';
import {
  CreateTicketRequest,
  GetIssuedTicketRequest,
  GetTicketDetailResponse,
  RetrieveIssuedTicketListResponse,
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
  }: GetIssuedTicketRequest): Promise<RetrieveIssuedTicketListResponse> => {
    const response = await axiosPrivate.get(
      `events/${eventId}/issuedTickets?page=${page}&userName=${userName}&phoneNumber=${phoneNumber}`,
    );
    return response.data.data;
  },
};

export default TicketApi;

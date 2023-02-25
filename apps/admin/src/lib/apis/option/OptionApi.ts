import { axiosPrivate } from '../axios';
import {
  ApplyTicketOptionRequest,
  CreateTicketOptionRequest,
  GetAppliedOptionGroupsResponse,
  GetEventOptionsResponse,
  GetTicketItemOptionsResponse,
  OptionGroupResponse,
} from './optionType';

const OptionApi = {
  GET_ALL_OPTION: async (eventId: string): Promise<GetEventOptionsResponse> => {
    const response = await axiosPrivate.get(`events/${eventId}/ticketOptions`);
    return response.data.data;
  },

  POST_OPTION: async ({
    eventId,
    payload,
  }: {
    eventId: string;
    payload: CreateTicketOptionRequest;
  }): Promise<OptionGroupResponse> => {
    console.log(payload);
    const response = await axiosPrivate.post(
      `events/${eventId}/ticketOptions`,
      payload,
    );
    return response.data.data;
  },

  PATCH_OPTION_DELETE: async ({
    eventId,
    optionGroupId,
  }: {
    eventId: string;
    optionGroupId: number;
  }): Promise<GetEventOptionsResponse> => {
    const response = await axiosPrivate.patch(
      `events/${eventId}/ticketOptions/${optionGroupId}`,
    );
    return response.data.data;
  },

  GET_TICKET_OPTION: async ({
    eventId,
    ticketItemId,
  }: {
    eventId: string;
    ticketItemId: number;
  }): Promise<GetTicketItemOptionsResponse> => {
    const response = await axiosPrivate.get(
      `events/${eventId}/ticketItems/${ticketItemId}/options`,
    );
    return response.data.data;
  },

  /**
   * 옵션 적용
   * @param param0
   */
  PATCH_APPLY_OPTION: async ({
    eventId,
    ticketItemId,
    payload,
  }: {
    eventId: string;
    ticketItemId: string;
    payload: ApplyTicketOptionRequest;
  }): Promise<GetTicketItemOptionsResponse> => {
    const response = await axiosPrivate.patch(
      `events/${eventId}/ticketItems/${ticketItemId}/option`,
      payload,
    );
    return response.data.data;
  },
  PATCH_CANCEL_OPTION: async ({
    eventId,
    ticketItemId,
    payload,
  }: {
    eventId: string;
    ticketItemId: string;
    payload: ApplyTicketOptionRequest;
  }): Promise<GetTicketItemOptionsResponse> => {
    const response = await axiosPrivate.patch(
      `events/${eventId}/ticketItems/${ticketItemId}/option/cancel`,
      payload,
    );
    return response.data.data;
  },

  GET_EVENTS_APPLIEDOPTIONGROUPS: async (
    eventId: string,
  ): Promise<GetAppliedOptionGroupsResponse> => {
    const response = await axiosPrivate.get(
      `events/${eventId}/ticketItems/appliedOptionGroups`,
    );
    return response.data.data;
  },
};

export default OptionApi;

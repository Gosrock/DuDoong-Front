import {CreateOptionRequest , AllOptionResponse, AllOptionGroupResponse, AppliedOptionListResponse, AppliedOptionGroupResponse} from './optionType';
import { axiosPrivate } from '../axios';
import { OptionGroupIdRequest } from './optionType';


const OptionApi = {
    GET_ALL_OPTION: async(
        eventId: string,
    ): Promise<AllOptionGroupResponse> => {
        const response = await axiosPrivate.get(
            `events/${eventId}/ticketOptions`,
        );
        return response.data.data;
    },

    POST_OPTION: async({
        eventId,
        payload
    }: {
        eventId: string;
        payload: CreateOptionRequest;
    }): Promise<AllOptionResponse> => {
        console.log(payload)
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
    }): Promise<AllOptionGroupResponse> => {
        const response = await axiosPrivate.patch(
            `events/${eventId}/ticketOptions/${optionGroupId}`,
        );
        return response.data.data;
    },

    GET_TICKET_OPTION: async({
        eventId,
        ticketItemId,
    }: {
        eventId: string;
        ticketItemId: number;
    }): Promise<AllOptionGroupResponse> => {
        const response = await axiosPrivate.get(
            `events/${eventId}/ticketItems/${ticketItemId}/options`,
        );
        return response.data.data;
    },

    PATCH_APPLY_OPTION: async({
        eventId,
        ticketItemId,
        payload,
    }: {
        eventId: string;
        ticketItemId: number;
        payload: OptionGroupIdRequest;
    }): Promise<AllOptionGroupResponse> => {
        const response = await axiosPrivate.patch(
            `events/${eventId}/ticketItems/${ticketItemId}/option`,
            payload
        );
        return response.data.data
    },

    PATCH_CANCEL_OPTION: async({
        eventId,
        ticketItemId,
        payload,
    }: {
        eventId: string;
        ticketItemId: number;
        payload: OptionGroupIdRequest;
    }): Promise<AllOptionGroupResponse> => {
        const response = await axiosPrivate.patch(
            `events/${eventId}/ticketItems/${ticketItemId}/option/cancel`,
            payload
        );
        return response.data.data
},

    GET_TICKET_OPTION_EACH: async(
        eventId: string
        ) : Promise<AppliedOptionListResponse> => {
        const response = await axiosPrivate.get(
            `events/${eventId}/ticketItems/appliedOptionGroups`
        );
        return response.data.data
    }
};

export default OptionApi;


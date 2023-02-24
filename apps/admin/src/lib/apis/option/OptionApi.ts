import {CreateOptionRequest , AllOptionResponse, AllOptionGroupResponse} from './optionType';
import { axiosPrivate } from '../axios';


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
    }
}

export default OptionApi;


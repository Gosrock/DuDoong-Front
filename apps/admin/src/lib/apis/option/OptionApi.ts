import {CreateOptionRequest ,AllOptionResponse} from './optionType';
import { axiosPrivate } from '../axios';


const OptionApi = {
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
    }
}

export default OptionApi;


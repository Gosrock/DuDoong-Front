import { InfiniteRequest, InfiniteResponse } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import { EventProfileResponse } from './eventType';

const EventApi = {
  GET_EVENTS: async ({
    pageParam = 0,
    size = 10,
    sort = 'asc',
  }: InfiniteRequest): Promise<InfiniteResponse<EventProfileResponse>> => {
    const response = await axiosPrivate.get(
      `/events?page=${pageParam}&size=${size}&sort=${sort}`,
    );
    return response.data.data;
  },
};

export default EventApi;

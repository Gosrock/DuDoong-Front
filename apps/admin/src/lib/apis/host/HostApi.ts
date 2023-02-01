import { InfiniteRequest } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import { PageResponseHostProfileResponse } from './hostType';

export const HostApi = {
  GET_HOSTS: async ({
    page = 0,
    size = 10,
    sort = 'asc',
  }: InfiniteRequest): Promise<PageResponseHostProfileResponse> => {
    const response = await axiosPrivate.get(
      `/hosts?page=${page}&size=${size}&sort=${sort}`,
    );
    return response.data.data;
  },
};

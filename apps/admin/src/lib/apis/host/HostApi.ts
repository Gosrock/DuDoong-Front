import { InfiniteRequest, InfiniteResponse } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import { HostProfileResponse } from './hostType';

const HostApi = {
  GET_HOSTS: async ({
    pageParam = 0,
    size = 10,
    sort = 'asc',
  }: InfiniteRequest): Promise<InfiniteResponse<HostProfileResponse>> => {
    const response = await axiosPrivate.get(
      `/hosts?page=${pageParam}&size=${size}&sort=${sort}`,
    );
    return response.data.data;
  },
};

export default HostApi;

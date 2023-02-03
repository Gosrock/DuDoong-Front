import { InfiniteRequest, InfiniteResponse } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import { HostDetailResponse, HostProfileResponse } from './hostType';
import { CreateHostRequest, CreateHostResponse } from './hostType';

const HostApi = {
  GET_HOSTS: async ({
    pageParam = 0,
    size = 10,
    sort = 'desc',
  }: InfiniteRequest): Promise<InfiniteResponse<HostProfileResponse>> => {
    const response = await axiosPrivate.get(
      `/hosts?page=${pageParam}&size=${size}&sort=${sort}`,
    );
    return response.data.data;
  },

  GET_HOST_DETAIL: async (hostId: string): Promise<HostDetailResponse> => {
    const response = await axiosPrivate.get(`hosts/${hostId}`);
    return response.data.data;
  },
  ADD_HOSTS: async (
    payload: CreateHostRequest,
  ): Promise<CreateHostResponse> => {
    const response = await axiosPrivate.post('/hosts', payload);
    return response.data.data;
  },
};

export default HostApi;

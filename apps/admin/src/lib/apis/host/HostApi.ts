import { InfiniteRequest } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import {
  CreateHostRequest,
  CreateHostResponse,
  PageResponseHostProfileResponse,
} from './hostType';

export const HostApi = {
  GET_HOSTS: async ({
    pageParam = 0,
    size = 10,
    sort = 'asc',
  }: InfiniteRequest): Promise<PageResponseHostProfileResponse> => {
    const response = await axiosPrivate.get(
      `/hosts?page=${pageParam}&size=${size}&sort=${sort}`,
    );
    return response.data.data;
  },
  ADD_HOSTS: async (
    payload: CreateHostRequest,
  ): Promise<CreateHostResponse> => {
    const response = await axiosPrivate.post('/hosts', payload);
    return response.data.data;
  },
};

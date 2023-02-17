import { InfiniteRequest, InfiniteResponse } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import type {
  HostDetailResponse,
  UpdateHostRequest,
  HostProfileResponse,
  imageFileExtensionType,
  CreateHostRequest,
  CreateHostResponse,
} from './hostType';

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

  PATCH_HOST_PROFILE: async ({
    hostId,
    payload,
  }: {
    hostId: string;
    payload: UpdateHostRequest;
  }): Promise<HostDetailResponse> => {
    const response = await axiosPrivate.patch(
      `/hosts/${hostId}/profile`,
      payload,
    );
    return response.data.data;
  },

  POST_HOST_IMAGE: async ({
    hostId,
    imageFileExtension,
  }: {
    hostId: string;
    imageFileExtension: imageFileExtensionType;
  }): Promise<any> => {
    const response = await axiosPrivate.post(
      `/hosts/${hostId}/images?imageFileExtension=${imageFileExtension}`,
    );
    return response.data.data;
  },
};

export default HostApi;

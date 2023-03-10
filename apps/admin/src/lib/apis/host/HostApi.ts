import { InfiniteRequest, InfiniteResponse, UserProfile } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import type { EventProfileResponse } from '../event/eventType';
import type {
  HostDetailResponse,
  UpdateHostRequest,
  HostProfileResponse,
  imageFileExtensionType,
  CreateHostRequest,
  CreateHostResponse,
  SlackRequest,
  ImageUrlResponse,
  InviteHostRequest,
} from './hostType';

const HostApi = {
  GET_HOSTS: async ({
    pageParam = 0,
    size = 100,
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
  }): Promise<ImageUrlResponse> => {
    const response = await axiosPrivate.post(
      `/hosts/${hostId}/images?imageFileExtension=${imageFileExtension}`,
    );
    return response.data.data;
  },

  PATCH_HOST_SLACK: async (
    hostId: string | undefined,
    payload: SlackRequest,
  ): Promise<HostDetailResponse> => {
    const response = await axiosPrivate.patch(
      `/hosts/${hostId}/slack`,
      payload,
    );
    return response.data.data;
  },

  GET_HOST_EVENTS: async (
    hostId: string,
    pageParam = 0,
    size = 10,
    sort = 'asc',
  ): Promise<InfiniteResponse<EventProfileResponse>> => {
    const response = await axiosPrivate.get(`/hosts/${hostId}/events`);
    return response.data.data;
  },

  GET_HOST_INVITE_USER: async ({
    hostId,
    email,
  }: {
    hostId: string;
    email: string;
  }): Promise<UserProfile> => {
    const response = await axiosPrivate.get(
      `/hosts/${hostId}/invite/users?email=${email}`,
    );
    return response.data.data;
  },

  POST_HOST_INVITE: async ({
    hostId,
    payload,
  }: {
    hostId: string;
    payload: InviteHostRequest;
  }): Promise<HostDetailResponse> => {
    const response = await axiosPrivate.post(
      `/hosts/${hostId}/invite`,
      payload,
    );
    return response.data.data;
  },

  POST_HOST_JOIN: async (hostId: string): Promise<HostDetailResponse> => {
    const response = await axiosPrivate.post(`/hosts/${hostId}/join`);
    return response.data.data;
  },

  POST_HOST_REJECT: async (hostId: string): Promise<HostDetailResponse> => {
    const response = await axiosPrivate.post(`/hosts/${hostId}/reject`);
    return response.data.data;
  },
};

export default HostApi;

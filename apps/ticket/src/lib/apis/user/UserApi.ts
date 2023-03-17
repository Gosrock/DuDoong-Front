import { OauthLoginResponse } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import { UserInfo } from './userType';

export const UserApi = {
  GET_MY_INFO: async (): Promise<UserInfo> => {
    const response = await axiosPrivate.get(`/users/me`);
    return response.data.data;
  },

  REFRESH: async (refreshToken?: string): Promise<OauthLoginResponse> => {
    const tokenParam = refreshToken ? `?token=${refreshToken}` : '';
    const response = await axiosPrivate.post(
      `/auth/token/refresh${tokenParam}`,
    );
    return response.data.data;
  },
};

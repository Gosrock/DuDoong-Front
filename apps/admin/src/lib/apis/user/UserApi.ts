import { axiosPrivate } from '../axios';
import { UserInfo } from './userType';

export const UserApi = {
  OAUTH_LOGOUT: async (): Promise<null> => {
    const response = await axiosPrivate.post(`/auth/logout`);
    return response.data.data;
  },

  GET_MY_INFO: async (): Promise<UserInfo> => {
    const response = await axiosPrivate.get(`/users/me`);
    return response.data.data;
  },
};

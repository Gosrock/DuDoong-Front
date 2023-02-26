import { axiosPrivate } from '../axios';
import { UserInfo } from './userType';

export const UserApi = {
  GET_MY_INFO: async (): Promise<UserInfo> => {
    const response = await axiosPrivate.get(`/users/me`);
    return response.data.data;
  },
};

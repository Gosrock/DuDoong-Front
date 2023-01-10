import { axiosPrivate } from '../axios';

export const AuthApi = {
  OAUTH_LINK: async () => {
    const { data } = await axiosPrivate.get('/auth/oauth/kakao/link');
    return data;
  },
};

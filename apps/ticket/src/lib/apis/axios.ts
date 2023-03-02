import { axiosPublic, BASE_URL } from '@dudoong/utils';
import axios, { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    const { config, response } = error;
    const { status } = response;
    if (typeof window !== undefined && status === 401) {
      const refreshToken = getCookie('refreshToken') as string;
      const { data } = await axiosPublic.post(
        `/auth/token/refresh?token=${refreshToken}`,
      );
      const accessToken = data.data.accessToken;
      console.log(accessToken);
      axiosPrivate.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      console.log(config);
      config.headers.Authorization = `Bearer ${accessToken}`;
      return axios(config);
    }
    return Promise.reject(error);
  },
);

export const AuthAPi = {
  OAUTH_LOGOUT: async (): Promise<null> => {
    const response = await axiosPrivate.post(`/auth/logout`);
    return response.data.data;
  },
  OAUTH_DELETE: async (): Promise<null> => {
    const response = await axiosPrivate.delete(`/auth/me`);
    return response.data.data;
  },
};

import { BASE_URL } from '@dudoong/utils';
import axios, { AxiosError } from 'axios';

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export const AuthAPi = {
  OAUTH_LOGOUT: async (): Promise<null> => {
    const response = await axiosPrivate.post(`/auth/logout`);
    return response.data.data;
  },
};

import { BASE_URL } from '@dudoong/utils';
import axios from 'axios';

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const AuthAPi = {
  OAUTH_LOGOUT: async (): Promise<null> => {
    const response = await axiosPrivate.post(`/auth/logout`);
    return response.data.data;
  },
};

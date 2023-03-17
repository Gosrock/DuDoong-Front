import { AuthApi, BASE_URL } from '@dudoong/utils';
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  isAxiosError,
} from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { UserApi } from './user/UserApi';

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!isAxiosError(error)) return Promise.reject(error);

    const status = Number(error.response?.status);
    const origin = error.config as AxiosRequestConfig;

    if (status === 401) {
      const refreshToken = getCookie('refreshToken');
      const refresh = await AuthApi.REFRESH(String(refreshToken));

      const cookieString = `refreshToken=${refresh.refreshToken}; path=/; max-age=${refresh.refreshTokenAge}; secure=true; SameSite=None;`;
      axiosPrivate.defaults.headers.Cookie = cookieString;
      (origin.headers as AxiosHeaders).set('set-cookie', cookieString);
      setCookie('refreshToken', refresh.refreshToken, {
        maxAge: refresh.refreshTokenAge,
        sameSite: 'none',
        secure: true,
        path: '/',
      });

      axiosPrivate.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${refresh.accessToken}`;
      (origin.headers as AxiosHeaders).set(
        'Authorization',
        `Bearer ${refresh.accessToken}`,
      );

      return axios(origin);
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

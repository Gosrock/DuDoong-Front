import { BASE_URL, OauthLoginResponse } from '@dudoong/utils';
import axios from 'axios';
import { setCookie } from 'cookies-next';

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const setCredentials = (refresh: OauthLoginResponse) => {
  axiosPrivate.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${refresh.accessToken}`;

  if (process.env.NODE_ENV === 'development') {
    setCookie('accessToken', refresh.accessToken, {
      maxAge: refresh.accessTokenAge,
    });
    setCookie('refreshToken', refresh.refreshToken, {
      maxAge: refresh.refreshTokenAge,
    });
  }
};

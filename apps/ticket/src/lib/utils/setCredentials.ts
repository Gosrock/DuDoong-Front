import { OauthLoginResponse } from '@dudoong/utils';
import { axiosPrivate } from '@lib/apis/axios';
import { setCookie } from 'cookies-next';

export const setCredentials = (refresh: OauthLoginResponse) => {
  axiosPrivate.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${refresh.accessToken}`;

  // 개발환경에서 로컬호스트로 쿠키 직접 넣어주기 위함
  if (process.env.NODE_ENV === 'development') {
    setCookie('accessToken', refresh.accessToken, {
      maxAge: refresh.accessTokenAge,
    });
    setCookie('refreshToken', refresh.refreshToken, {
      maxAge: refresh.refreshTokenAge,
    });
  }
};

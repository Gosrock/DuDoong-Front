import { axiosPublic, OauthLoginResponse } from '@dudoong/utils';
import { axiosPrivate } from '@lib/apis/axios';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

/* export const setSsrAxiosHeader = (cookies: NextApiRequestCookies) => {
  axiosPrivate.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${cookies.accessToken}`;
}; */

export const setSsrAxiosHeader = async (cookies: NextApiRequestCookies) => {
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;
  if (!cookies.accessToken) {
    const response = await axiosPublic.post<OauthLoginResponse>(
      `/auth/token/refresh?token=${refreshToken}`,
    );

    axiosPrivate.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${response.data.accessToken}`;
  } else {
    axiosPrivate.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`;
  }
};

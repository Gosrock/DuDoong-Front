import { axiosPrivate } from '@lib/apis/axios';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export const setSsrAxiosHeader = (cookies: NextApiRequestCookies) => {
  axiosPrivate.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${cookies.accessToken}`;
};

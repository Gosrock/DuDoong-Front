import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: any, option?: any) => {
  return cookies.set(name, value, {
    ...option,
    path: '/',
    secure: true,
    sameSite: 'none',
  });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: any, option?: any) => {
  cookies.remove(name);
  return cookies.set(name, value, {
    ...option,
    path: '/',
  });
};

export const getCookie = (name: string) => {
  return cookies.get(name, { doNotParse: false });
};

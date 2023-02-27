import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: any, option?: any) => {
  cookies.set(name, value, {
    ...option,
    path: '/',
  });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  return cookies.remove(name, { path: '/' });
};

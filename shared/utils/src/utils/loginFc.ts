import { serialize } from 'cookie';
import { AuthApi } from '../apis';

export const loginFc = {
  login: async (options?: { redirect: string }) => {
    if (options && options.redirect.length > 0) {
      document.cookie = serialize('redirectUrl', options.redirect, {
        path: '/',
        maxAge: 60,
      });
    }
    const data = await AuthApi.OAUTH_LINK();
    window.location.href = data.link;
  },

  logout: async () => {
    //TODO: logout 로직
    document.cookie = serialize('redirectUrl', '', {
      maxAge: -1,
    });
  },
};

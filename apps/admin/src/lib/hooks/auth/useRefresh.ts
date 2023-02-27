import { useSetRecoilState } from 'recoil';
import { authState } from '@store/auth';
import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '@dudoong/utils';
import { axiosPrivate } from '@lib/apis/axios';
// import { useCookies } from 'react-cookie';
import { setCookie, removeCookie } from '@lib/utils/cookie';

const useRefresh = () => {
  const setAuth = useSetRecoilState(authState);
  const { mutate: refreshMutate, status } = useMutation(AuthApi.REFRESH, {
    onSuccess: (data) => {
      axiosPrivate.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.accessToken}`;
      setAuth({
        userProfile: data.userProfile,
        accessToken: data.accessToken,
        isAuthenticated: true,
        callbackUrl: '/',
      });
      if (import.meta.env.DEV) {
        removeCookie('refreshToken');
        removeCookie('accessToken');
        setCookie('refreshToken', data.refreshToken, {
          maxAge: data.refreshTokenAge,
          path: '/',
        });
        setCookie('accessToken', data.accessToken, {
          maxAge: data.accessTokenAge,
          path: '/',
        });
      }
    },
    retry: false,
  });

  return { refreshMutate, status };
};

export default useRefresh;

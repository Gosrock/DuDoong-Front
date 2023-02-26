import { useSetRecoilState } from 'recoil';
import { authState } from '@store/auth';
import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '@dudoong/utils';
import { axiosPrivate } from '@lib/apis/axios';
import { useCookies } from 'react-cookie';

const useRefresh = () => {
  const setAuth = useSetRecoilState(authState);
  const [cookies, setCookie, removeCookie] = useCookies();
  const { mutate: refreshMutate, status } = useMutation(AuthApi.REFRESH, {
    onSuccess: (data) => {
      console.log(data.accessToken);
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
        console.log('세팅확인', cookies.accessToken, cookies.refreshToken);
      }
      console.log('받아온거', data.accessToken, data.refreshToken);
    },
    retry: false,
  });

  return { refreshMutate, status };
};

export default useRefresh;

import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '@dudoong/utils';
import { OauthLoginResponse } from '@dudoong/utils';
import { useSetRecoilState } from 'recoil';
import { authState } from '@store/auth';

const useRefreshMutate = () => {
  const setAuthState = useSetRecoilState(authState);

  // 토큰 재발급
  const authRefreshMutation = useMutation(AuthApi.REFRESH, {
    onSuccess: (data: OauthLoginResponse) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setAuthState({
        isAuthenticated: true,
        callbackUrl: '/',
        ...data,
      });
    },
  });

  return { authRefreshMutation };
};

export default useRefreshMutate;

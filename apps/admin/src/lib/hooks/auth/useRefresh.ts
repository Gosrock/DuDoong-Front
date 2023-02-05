import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '@store/auth';
import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '@dudoong/utils';
import { axiosPrivate } from '@lib/apis/axios';

const useRefresh = () => {
  const [state, setState] = useState<'loading' | 'succeed' | 'failed'>(
    'loading',
  );
  const setAuth = useSetRecoilState(authState);

  const refreshMutation = useMutation(AuthApi.REFRESH, {
    onMutate: () => {
      setState('loading');
    },
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
      localStorage.setItem('refreshToken', data.refreshToken);
      console.log(data.accessToken);
      setState('succeed');
    },
    onError: () => {
      setState('failed');
    },
  });

  return { refreshMutation, state, setState };
};

export default useRefresh;

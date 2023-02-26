import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '@store/auth';
import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '@dudoong/utils';
import { axiosPrivate } from '@lib/apis/axios';
import { setCookie } from '@lib/utils/cookie';

const useRefresh = () => {
  const setAuth = useSetRecoilState(authState);

  const { mutate: refreshMutate, status } = useMutation(AuthApi.REFRESH, {
    onSuccess: (data) => {
      console.log(data);
      axiosPrivate.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.accessToken}`;
      setAuth({
        userProfile: data.userProfile,
        accessToken: data.accessToken,
        isAuthenticated: true,
        callbackUrl: '/',
      });
      setCookie('refreshToken', data.refreshToken, {
        maxAge: data.refreshTokenAge,
      });
      console.log('받아온거', data.refreshToken);
    },
  });

  return { refreshMutate, status };
};

export default useRefresh;

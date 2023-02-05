import {
  AuthApi,
  OauthInfoResponse,
  OauthLoginResponse,
  OauthTokenResponse,
} from '@dudoong/utils';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { setCredentials } from '@lib/utils/setCredentials';
import { authState } from '@store/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

const useAuthMutate = ({ idToken, accessToken }: OauthTokenResponse) => {
  const { openGlobalOverlay, closeGlobalOverlay } = useGlobalOverlay();
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();

  // 카카오 회원정보 가져오기
  const ouathKakaoInfoMutation = useMutation(AuthApi.OAUTH_INFO, {
    onSuccess: (data: OauthInfoResponse) => {
      openGlobalOverlay({
        content: 'register',
        props: {
          name: data.name,
          onMainActionClick: () => {
            ouathKakaoRegisterMutation.mutate({ idToken, payload: data });
          },
        },
      });
    },
  });

  // 회원가입
  const ouathKakaoRegisterMutation = useMutation(AuthApi.OAUTH_REGISTER, {
    onSuccess: (data: OauthLoginResponse) => {
      onSuccessLogin(data);
      closeGlobalOverlay();
      router.replace(auth.callbackUrl);
    },
  });

  // 로그인
  const ouathKakaoLoginMutation = useMutation(AuthApi.OAUTH_LOGIN, {
    onSuccess: (data: OauthLoginResponse) => {
      onSuccessLogin(data);
      router.replace(auth.callbackUrl);
    },
  });

  // 회원가입 여부 (kakaoCallback 진입)
  const oauthValidMutation = useMutation(AuthApi.OAUTH_VALID, {
    onSuccess: (data: { canRegister: boolean }) => {
      if (data.canRegister) {
        // 회원가입 필요
        ouathKakaoInfoMutation.mutate(accessToken);
      } else {
        // 바로 로그인
        ouathKakaoLoginMutation.mutate(idToken);
      }
    },
  });

  const onSuccessLogin = (loginData: OauthLoginResponse) => {
    console.log(loginData);
    setAuth({ ...auth, isAuthenticated: true, ...loginData });
    setCredentials(loginData);
  };

  return { oauthValidMutation, ouathKakaoLoginMutation };
};

export default useAuthMutate;

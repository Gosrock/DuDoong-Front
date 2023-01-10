import { AuthApi, OauthInfoResponse, OauthLoginResponse } from '@dudoong/utils';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { useMutation } from '@tanstack/react-query';
import { CallbackDataType } from './Callback';

const useAuthMutate = (queryParams: CallbackDataType) => {
  const { openOverlay } = useGlobalOverlay();
  const { idToken, accessToken } = queryParams;

  // 카카오 회원정보 가져오기
  const ouathKakaoInfoMutation = useMutation(AuthApi.OAUTH_INFO, {
    onSuccess: (data: OauthInfoResponse) => {
      openOverlay({
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
      console.log(data, '회원가입 완료');
    },
  });

  // 로그인
  const ouathKakaoLoginMutation = useMutation(AuthApi.OAUTH_LOGIN, {
    onSuccess: (data: OauthLoginResponse) => {
      console.log(data, '로그인 완료');
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
  return { oauthValidMutation, ouathKakaoLoginMutation };
};

export default useAuthMutate;

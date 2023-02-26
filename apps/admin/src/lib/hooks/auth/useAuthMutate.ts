import {
  AuthApi,
  OauthInfoResponse,
  OauthLoginResponse,
  OauthTokenResponse,
} from '@dudoong/utils';
import { axiosPrivate } from '@lib/apis/axios';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { authState } from '@store/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';

const useAuthMutate = ({ idToken, accessToken }: OauthTokenResponse) => {
  const { openOverlay, closeOverlay } = useGlobalOverlay();
  const [auth, setAuth] = useRecoilState(authState);
  const [cookies, setCookie] = useCookies(['refreshToken']);
  const navigate = useNavigate();

  // 카카오 회원정보 가져오기
  const oauthKakaoInfoMutation = useMutation(AuthApi.OAUTH_INFO, {
    onSuccess: (data: OauthInfoResponse) => {
      openOverlay({
        content: 'register',
        props: {
          name: data.name,
          onMainActionClick: () => {
            oauthKakaoRegisterMutation.mutate({ idToken, payload: data });
          },
        },
      });
    },
  });

  // 회원가입
  const oauthKakaoRegisterMutation = useMutation(AuthApi.OAUTH_REGISTER, {
    onSuccess: (data: OauthLoginResponse) => {
      onSuccessLogin(data);
      closeOverlay();
      navigate(auth.callbackUrl);
    },
  });

  // 로그인
  const oauthKakaoLoginMutation = useMutation(AuthApi.OAUTH_LOGIN, {
    onSuccess: (data: OauthLoginResponse) => {
      onSuccessLogin(data);
      navigate(auth.callbackUrl);
    },
  });

  // 회원가입 여부 (kakaoCallback 진입)
  const oauthValidMutation = useMutation(AuthApi.OAUTH_VALID, {
    onSuccess: (data: { canRegister: boolean }) => {
      if (data.canRegister) {
        // 회원가입 필요
        oauthKakaoInfoMutation.mutate(accessToken);
      } else {
        // 바로 로그인
        oauthKakaoLoginMutation.mutate(idToken);
      }
    },
  });

  const onSuccessLogin = (loginData: OauthLoginResponse) => {
    // console.log(loginData.refreshToken, 'login');
    axiosPrivate.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${loginData.accessToken}`;
    console.log('로그인성공', loginData.refreshToken);
    setCookie('refreshToken', loginData.refreshToken, {
      maxAge: loginData.refreshTokenAge,
    });
    console.log('세팅확인', cookies.refreshToken);
    setAuth({
      isAuthenticated: true,
      callbackUrl: '/',
      userProfile: loginData.userProfile,
      accessToken: loginData.accessToken,
    });
  };

  return { oauthValidMutation, oauthKakaoLoginMutation };
};

export default useAuthMutate;

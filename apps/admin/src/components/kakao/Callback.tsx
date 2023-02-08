import { FullScreen, SyncLoader } from '@dudoong/ui';
import { AuthApi, OauthTokenResponse } from '@dudoong/utils';
import { css } from '@emotion/react';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuthMutate from '../../lib/hooks/auth/useAuthMutate';

//카카오 로그인 리다이렉트 페이지
const Callback = () => {
  const [tokens, setTokens] = useState<OauthTokenResponse>({
    accessToken: '',
    idToken: '',
    refreshToken: '',
  });
  const search = useLocation().search;
  const code = new URLSearchParams(search).get('code');

  const { oauthValidMutation } = useAuthMutate(tokens);

  const oauthTokenMutation = useMutation(AuthApi.OAUTH_TOKEN, {
    onSuccess: (data: OauthTokenResponse) => {
      setTokens(data);
    },
  });

  useEffect(() => {
    if (code) {
      oauthTokenMutation.mutate(code);
    }
  }, [code]);
  useEffect(() => {
    if (tokens.idToken.length > 0) {
      oauthValidMutation.mutate(tokens.idToken);
    }
  }, [tokens]);

  return (
    <FullScreen verticalCenter>
      <SyncLoader />
    </FullScreen>
  );
};

export default Callback;

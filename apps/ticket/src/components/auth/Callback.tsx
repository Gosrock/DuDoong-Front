import { FullScreen, SyncLoader } from '@dudoong/ui';
import { AuthApi, OauthTokenResponse } from '@dudoong/utils';
import { css } from '@emotion/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAuthMutate from './useAuthMutate';

//카카오 로그인 리다이렉트 페이지
const Callback = () => {
  const [tokens, setTokens] = useState<OauthTokenResponse>({
    accessToken: '',
    idToken: '',
    refreshToken: '',
  });
  const router = useRouter();
  const { code } = router.query as unknown as { code: string };
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
    <FullScreen
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <SyncLoader />
    </FullScreen>
  );
};

export default Callback;

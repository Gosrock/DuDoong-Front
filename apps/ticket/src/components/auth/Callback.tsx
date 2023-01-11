import { FullScreen, SyncLoader } from '@dudoong/ui';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuthMutate from './useAuthMutate';

export interface CallbackDataType {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

//카카오 로그인 리다이렉트 페이지
const Callback = () => {
  const router = useRouter();
  const queryParams = router.query as unknown as CallbackDataType;
  const { oauthValidMutation } = useAuthMutate(queryParams);

  useEffect(() => {
    if (queryParams.idToken) {
      oauthValidMutation.mutate(queryParams.idToken);
    }
  }, [queryParams]);

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

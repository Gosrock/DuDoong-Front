import { Button, ButtonSet, ListHeader, Text, theme } from '@dudoong/ui';
import { AuthApi } from '@dudoong/utils';
import { css } from '@emotion/react';

const Login = () => {
  const onLogin = async () => {
    const data = await AuthApi.OAUTH_LINK();
    window.location.href = data.data.link;
  };
  return (
    <>
      <ListHeader size="listHeader_20" title={'로그인이 필요해요'} />
      <ButtonSet varient="sub" padding={[20, 24]}>
        <>
          <Button varient="kakao" onClick={onLogin}>
            카카오로 로그인하기
          </Button>
          <button
            css={css`
              color: ${theme.palette.gray_300};
              &:hover {
                text-decoration: underline;
              }
            `}
          >
            <Text typo={'Text_16'}>또는, 회원가입하기</Text>
          </button>
        </>
      </ButtonSet>
    </>
  );
};

export default Login;

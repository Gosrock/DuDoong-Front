import { Button, ButtonSet, ListHeader, Text, theme } from '@dudoong/ui';
<<<<<<< HEAD
import { css } from '@emotion/react';

const Login = () => {
=======
import { AuthApi } from '@dudoong/utils';
import { css } from '@emotion/react';

const Login = () => {
  const onLogin = async () => {
    const data = await AuthApi.OAUTH_LINK();
    window.location.href = data.data.link;
  };
>>>>>>> 77cef6b71ddb5e81757f722cf8af0636b449bccc
  return (
    <>
      <ListHeader size="listHeader_20" title={'로그인이 필요해요'} />
      <ButtonSet varient="sub" padding={[20, 24]}>
        <>
<<<<<<< HEAD
          <Button varient="kakao">카카오로 로그인하기</Button>
=======
          <Button varient="kakao" onClick={onLogin}>
            카카오로 로그인하기
          </Button>
>>>>>>> 77cef6b71ddb5e81757f722cf8af0636b449bccc
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

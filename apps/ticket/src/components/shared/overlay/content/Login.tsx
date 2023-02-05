import { Button, ButtonSet, ListHeader } from '@dudoong/ui';
import { AuthApi } from '@dudoong/utils';

export interface LoginProps {
  variant?: 'expired' | 'new';
}

const titleText = {
  expired: '로그인이 만료되었어요',
  new: '로그인이 필요해요',
};

const Login = ({ variant = 'new' }: LoginProps) => {
  console.log(variant);
  const onLogin = async () => {
    const data = await AuthApi.OAUTH_LINK();
    window.location.href = data.link;
  };
  return (
    <>
      <ListHeader size="listHeader_20" title={titleText[variant]} />
      <ButtonSet varient="sub" padding={[20, 24]}>
        <>
          <Button varient="kakao" onClick={onLogin} fullWidth>
            카카오로 로그인하기
          </Button>
        </>
      </ButtonSet>
    </>
  );
};

export default Login;

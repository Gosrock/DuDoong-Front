import { Button, ButtonSet, ListHeader } from '@dudoong/ui';
import { AuthApi, useLogin } from '@dudoong/utils';

export interface LoginProps {
  variant?: 'expired' | 'new';
  redirect?: string;
}

const titleText = {
  expired: '로그인이 만료되었어요',
  new: '로그인이 필요해요',
};

const Login = ({ variant = 'new', redirect }: LoginProps) => {
  console.log(variant);
  const { login } = useLogin();
  return (
    <>
      <ListHeader size="listHeader_20" title={titleText[variant]} />
      <ButtonSet varient="sub" padding={[20, 24]}>
        <>
          <Button
            varient="kakao"
            onClick={() => login(redirect ? { redirect } : undefined)}
            fullWidth
          >
            카카오로 로그인하기
          </Button>
        </>
      </ButtonSet>
    </>
  );
};

export default Login;

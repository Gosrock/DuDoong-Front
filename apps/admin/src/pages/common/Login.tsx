import { AuthApi } from '@dudoong/utils';
import LoginMarkup from '@dudoong/ui/src/markup/LoginMarkup';

const Login = () => {
  const onLogin = async () => {
    const data = await AuthApi.OAUTH_LINK();
    window.location.href = data.link;
  };
  return (
    <LoginMarkup
      onKakao={onLogin}
      onTerm={() => {
        console.log('term');
      }}
      onPolicy={() => {
        console.log('policy');
      }}
    />
  );
};

export default Login;

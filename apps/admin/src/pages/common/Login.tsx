import LoginMarkup from '@dudoong/ui/src/layout/LoginMarkup';
import { AuthApi } from '@dudoong/utils';

const Login = () => {
  const onLogin = async () => {
    const data = await AuthApi.OAUTH_LINK();
    window.location.href = data.link;
  };
  return <LoginMarkup onKakao={onLogin} />;
};

export default Login;

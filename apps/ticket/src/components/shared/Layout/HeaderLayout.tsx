import { Layout } from '@dudoong/ui';
import { authState } from '@store/auth';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import css from 'styled-jsx/css';

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  const { userProfile } = useRecoilValue(authState);
  const router = useRouter();
  const handleLogin = () => {
    router.push(`/login?redirect=${window.location.pathname}`, `/login`);
  };

  if (router.asPath === '/login') {
    return <>{children}</>;
  } else {
    return (
      <Layout
        name={userProfile?.name}
        image={userProfile?.profileImage}
        handleLogin={handleLogin}
      >
        {children}
      </Layout>
    );
  }
};

export default HeaderLayout;

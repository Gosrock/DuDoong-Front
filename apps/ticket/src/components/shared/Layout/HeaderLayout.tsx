import { Layout } from '@dudoong/ui';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';
import { authState } from '@store/auth';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

interface HeaderLayoutProps {
  children: ReactNode;
}

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  const { userProfile } = useRecoilValue(authState);
  const { openOverlay } = useGlobalOverlay();
  const handleLogin = () => {
    openOverlay({ content: 'login' });
  };

  return (
    <Layout
      name={userProfile?.name}
      image={userProfile?.profileImage}
      handleLogin={handleLogin}
    >
      {children}
    </Layout>
  );
};

export default HeaderLayout;

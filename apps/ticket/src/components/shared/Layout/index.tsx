import { authState } from '@store/auth';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { HeaderLayout } from './HeaderLayout';
interface HeaderLayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: HeaderLayoutProps) => {
  const { userProfile } = useRecoilValue(authState);
  const { asPath } = useRouter();

  if (asPath === '/login') {
    return <>{children}</>;
  } else {
    return (
      <>
        <HeaderLayout
          name={userProfile?.name}
          image={userProfile?.profileImage}
        >
          {children}
        </HeaderLayout>
      </>
    );
  }
};

export default Layout;

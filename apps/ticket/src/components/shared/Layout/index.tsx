import { HeaderColorProvider } from '@dudoong/ui';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { HeaderLayout } from './HeaderLayout';
interface HeaderLayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: HeaderLayoutProps) => {
  const { asPath } = useRouter();

  if (asPath === '/login') {
    return <>{children}</>;
  } else {
    return (
      <HeaderColorProvider>
        <HeaderLayout>{children}</HeaderLayout>
      </HeaderColorProvider>
    );
  }
};

export default Layout;

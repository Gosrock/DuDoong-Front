import { media } from '@dudoong/ui';
import styled from '@emotion/styled';
import { authState } from '@store/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { HeaderLayout } from './HeaderLayout';
interface HeaderLayoutProps {
  children: ReactNode;
}

const navigatorMap = {
  '/': [
    { title: '공연 만들기', url: '/admin/' },
    { title: '공연 둘러보기', url: '/home' },
  ],
  '/home': [{ title: '공연 만들기', url: '/admin' }],
};

const Layout = ({ children }: HeaderLayoutProps) => {
  const { userProfile } = useRecoilValue(authState);
  const { push, asPath } = useRouter();
  const handleLogin = () => {
    push(`/login?redirect=${window.location.pathname}`, `/login`);
  };

  if (asPath === '/login') {
    return <>{children}</>;
  } else {
    return (
      <>
        <HeaderLayout
          name={userProfile?.name}
          image={userProfile?.profileImage}
          handleLogin={handleLogin}
        >
          {children}
        </HeaderLayout>
        {(asPath === '/' || asPath === '/home') && (
          <Navigator>
            {
              <>
                {navigatorMap[asPath].map((link) => (
                  <Link href={link.url} key={link.title}>
                    {link.title}
                  </Link>
                ))}
              </>
            }
          </Navigator>
        )}
      </>
    );
  }
};

const Navigator = styled.div`
  ${media.mobile} {
    display: none;
  }
  position: absolute;
  top: 12px;
  ${({ theme }) => theme.typo.G_Side_15_M}
  display: flex;
  gap: 36px;
  right: 180px;

  & > a {
    padding: 8px 10px;
    border-radius: 12px;

    &:hover {
      background-color: ${({ theme }) => theme.palette.gray_100};
    }
  }
`;

export default Layout;

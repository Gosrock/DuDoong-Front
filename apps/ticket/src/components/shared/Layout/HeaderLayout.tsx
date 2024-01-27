/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import {
  Divider,
  Header,
  PopupOptions,
  ProfileImage,
} from '@dudoong/ui/src/components';
import { media } from '@dudoong/ui/src/theme';
import { useRouter } from 'next/router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { authState } from '@store/auth';
import { resetCrendentials } from '@lib/utils/setCredentials';
import useToastify from '@dudoong/ui/src/lib/useToastify';
import { useMutation } from '@tanstack/react-query';
import { AuthAPi } from '@lib/apis/axios';
import Link from 'next/link';
import MobileHeader from './MobileHeader';
import HeaderProfileElement from './HeaderProfileElement';
import Shortcuts from '../Shortcuts';
import { ListRow } from '@dudoong/ui';

const navigatorMap = {
  '/': [
    { title: '공연 준비하기', url: '/admin/' },
    { title: '공연 둘러보기', url: '/home' },
  ],
  '/home': [
    { title: '공연 준비하기', url: '/admin' },
    { title: '서비스 소개', url: '/' },
  ],
};

export const HeaderLayout = ({ children }: PropsWithChildren) => {
  const { push, asPath } = useRouter();
  const { userProfile, isAuthenticated } = useRecoilValue(authState);
  const { Toast } = useToastify();
  const resetAuthState = useResetRecoilState(authState);
  const { setToast } = useToastify();
  const { mutate: logoutMutate } = useMutation(AuthAPi.OAUTH_LOGOUT, {
    onSuccess: () => {
      resetAuthState();
      resetCrendentials();
      setToast({ comment: '로그아웃되었어요', type: 'success' });
    },
  });

  const handleLogin = () => {
    push(`/login?redirect=${window.location.pathname}`, `/login`);
  };

  const profileOption: PopupOptions[] = [
    {
      title: '마이페이지',
      onClick: () => {
        push('/mypage');
      },
    },
    {
      title: '로그아웃',
      onClick: logoutMutate,
    },
  ];

  return (
    <Wrapper>
      {/* PC화면 헤더 */}
      <PcHeader>
        <Header
          rightElement={
            <HeaderProfileElement
              name={userProfile?.name}
              profileOption={profileOption}
              image={userProfile?.profileImage}
              handleLogin={handleLogin}
            />
          }
        />
        {(asPath === '/' || asPath === '/home') && (
          <Navigator>
            <>
              {navigatorMap[asPath].map((link) => (
                <Link href={link.url} key={link.title}>
                  {link.title}
                </Link>
              ))}
            </>
          </Navigator>
        )}
      </PcHeader>
      {/* 모바일화면 헤더 */}
      {(asPath === '/' || asPath === '/home') && (
        <MobileHeader>
          {isAuthenticated ? (
            <>
              <ListRow
                leftImage={
                  <ProfileImage
                    imageUrl={userProfile!.profileImage}
                    size={48}
                    alliance={false}
                  />
                }
                text={userProfile!.name}
                padding={[8, 20]}
                imageTextGap={12}
              />

              <Divider line padding={24} height={12} />
              <Shortcuts url="/mypage" text="마이페이지" padding={[12, 24]} />
              <Shortcuts
                onClick={logoutMutate}
                text="로그아웃"
                padding={[12, 24]}
              />
            </>
          ) : (
            <Shortcuts onClick={handleLogin} text="로그인" padding={[12, 24]} />
          )}
          <Divider line padding={24} height={12} />
          {(asPath === '/' || asPath === '/home') &&
            navigatorMap[asPath].map((link) => (
              <Shortcuts
                url={link.url}
                key={link.title}
                text={link.title}
                padding={[12, 24]}
              />
            ))}
        </MobileHeader>
      )}
      {/* 서비스 콘텐츠 */}
      <Content>
        <div>{children}</div>
      </Content>
      {/* 글로벌 토스트 */}
      <Toast />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.palette.white};

  ${media.pc} {
    min-width: 1280px;
  }
`;

const PcHeader = styled.div`
  ${media.mobile} {
    display: none;
  }
`;

const Content = styled.div`
  ${media.pc} {
    height: calc(100vh - 64px);
    position: relative;
    overflow: hidden;

    & > div {
      overflow: hidden scroll;
      position: absolute;
      height: 100%;
      top: 0px;
      left: 0px;
      right: 0px;
    }
  }
`;

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

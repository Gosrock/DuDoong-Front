/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode, useEffect } from 'react';
import { Header, Popup, PopupOptions } from '@dudoong/ui/src/components';
import { Profile } from '@dudoong/ui/src/components/Profile/Profile';
import { media, theme } from '@dudoong/ui/src/theme';
import { useRouter } from 'next/router';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { authState } from '@store/auth';
import { removeCookies } from 'cookies-next';
import { resetCrendentials } from '@lib/utils/setCredentials';
import useToastify from '@dudoong/ui/src/lib/useToastify';
import { useMutation } from '@tanstack/react-query';
import { AuthAPi } from '@lib/apis/axios';
export interface HeaderLayoutProps {
  children: ReactNode;
  name?: string;
  image?: string;
  handleLogin: () => void;
}

export const HeaderLayout = ({
  children,
  name,
  image,
  handleLogin,
}: HeaderLayoutProps) => {
  const { push } = useRouter();
  const { Toast } = useToastify();
  const resetAuthState = useResetRecoilState(authState);
  const auth = useRecoilState(authState);
  const { mutate: logoutMutate } = useMutation(AuthAPi.OAUTH_LOGOUT, {
    onSuccess: () => {
      resetAuthState();
      resetCrendentials();
    },
  });

  useEffect(() => {
    console.log(auth);
  }, [auth]);

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
      <Header
        rightElement={
          name ? (
            <Popup
              width={100}
              options={profileOption}
              renderElement={
                <Profile
                  size={'small'}
                  name={name}
                  image={image}
                  css={css`
                    cursor: pointer;
                    border-radius: 8px;
                    padding-right: 8px;
                    &:hover {
                      background-color: ${theme.palette.gray_100};
                    }
                  `}
                />
              }
            />
          ) : (
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
          )
        }
      />
      <Content>
        <div>{children}</div>
      </Content>
      <Toast />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  ${media.mobile} {
    & > div:first-of-type {
      display: none;
    }
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

const LoginButton = styled.button`
  height: 40px;
  width: 80px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.black};
  ${({ theme }) => theme.typo.Text_16}
  line-height:100%;
`;

/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Header } from '../../components';
import { Profile } from '../../components/Profile/Profile';
import { media } from '../../theme';
export interface LayoutProps {
  children: ReactNode;
  name?: string;
  image?: string;
  handleLogin: () => void;
}

export const Layout = ({ children, name, image, handleLogin }: LayoutProps) => {
  return (
    <Wrapper>
      <Header
        rightElement={
          name ? (
            <Profile size={'small'} name={name} image={image} />
          ) : (
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
          )
        }
      />
      <Content>
        <div>{children}</div>
      </Content>
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
      overflow-y: scroll;
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
  border-radius: 16px;
  background-color: ${({ theme }) => theme.palette.gray_200};
  ${({ theme }) => theme.typo.Text_16}
  line-height:100%;
`;

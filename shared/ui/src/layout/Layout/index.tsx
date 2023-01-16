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
      <div>{children}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 73px;
  ${media.mobile} {
    margin-top: 0px;
    & > div:first-of-type {
      display: none;
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

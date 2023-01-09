/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
<<<<<<< HEAD
import { Header } from '../../components';
import { Profile } from '../../components/Profile/Profile';
import { FlexBox } from '../FlexBox';
import { useResponsive } from './useResponsive';

export interface LayoutProps {
  children: JSX.Element;
=======
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Header } from '../../components';
import { Profile } from '../../components/Profile/Profile';
import { media } from '../../theme';
import { useResponsive } from './useResponsive';
export interface LayoutProps {
  children: ReactNode;
>>>>>>> fb33d8f10ad8f6c2cb0b2245ba677c7aab0de5b0
}

export const Layout = ({ children }: LayoutProps) => {
  const { isPC } = useResponsive();
<<<<<<< HEAD
  return <>{isPC ? <PCLayout>{children}</PCLayout> : <>{children}</>}</>;
};

const PCLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header rightElement={<Profile size={'small'} name={'한규진'} />} />
      <FlexBox
        align={'center'}
        css={css`
          margin-top: 72px;
        `}
      >
        {children}
      </FlexBox>
    </>
  );
};
=======
  return <>{isPC ? <PCLayout>{children}</PCLayout> : <div>{children}</div>}</>;
};

const PCLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header rightElement={<Profile size={'small'} name={'한규진'} />} />
      <div
        css={css`
          margin-top: 73px;
        `}
      >
        {children}
      </div>
    </>
  );
};

export const LayoutContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  ${media.pc} {
    max-width: 500px;
  }
`;
>>>>>>> fb33d8f10ad8f6c2cb0b2245ba677c7aab0de5b0

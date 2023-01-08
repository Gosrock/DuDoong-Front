/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Header } from '../../components';
import { Profile } from '../../components/Profile/Profile';
import { media } from '../../theme';
import { useResponsive } from './useResponsive';
export interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isPC } = useResponsive();
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

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { Header } from '../../components';
import { Profile } from '../../components/Profile/Profile';
import { FlexBox } from '../FlexBox';
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
      <FlexBox
        align={'center'}
        css={css`
          margin-top: 73px;
        `}
      >
        {children}
      </FlexBox>
    </>
  );
};

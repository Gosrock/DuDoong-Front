/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Header } from '../../components';
import { Profile } from '../../components/Profile/Profile';
import { FlexBox } from '../FlexBox';
import { useResponsive } from './useResponsive';

export interface LayoutProps {
  children: JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isPC } = useResponsive();
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

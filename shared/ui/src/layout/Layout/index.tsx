/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Header } from '../../components';
import { MockProfile } from '../../components/Header/header.stories';
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
      <Header rightElement={<MockProfile />} />
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

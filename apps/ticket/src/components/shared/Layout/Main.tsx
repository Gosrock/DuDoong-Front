import { media } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

const Main = ({
  children,
  fullWidth = false,
}: {
  children: ReactNode;
  fullWidth?: boolean;
}) => {
  return <Wrapper fullWidth={fullWidth}>{children}</Wrapper>;
};

export default Main;

const Wrapper = styled.main<{ fullWidth: boolean }>`
  padding-top: 48px;
  ${media.pc} {
    padding-top: 0px;
    ${({ fullWidth }) =>
      !fullWidth &&
      css`
        max-width: var(--main-width);
      `}
    margin: 0 auto;
    right: -10px; //스크롤바 자리 보정
    position: relative;
  }
`;

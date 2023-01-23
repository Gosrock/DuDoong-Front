import { media } from '@dudoong/ui';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

const Main = ({ children }: { children: ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Main;

const Wrapper = styled.main`
  padding-top: 48px;
  ${media.pc} {
    padding-top: 0px;
    max-width: 500px;
    margin: 0 auto;
    right: -10px; //스크롤바 자리 보정
    position: relative;
  }
`;

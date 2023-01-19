import { media } from '@dudoong/ui';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

const Main = ({ children }: { children: ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Main;

const Wrapper = styled.main`
  ${media.pc} {
    max-width: 500px;
    margin: 0 auto;
    position: relative;
  }
`;

import { media } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { authState } from '@store/auth';
import Hamburger from 'hamburger-react';
import { PropsWithChildren, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

const MobileHeader = ({ children }: PropsWithChildren) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useRecoilValue(authState);
  const [toggle, setToggle] = useState<boolean>(false);
  const onToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <Wrapper>
      <div ref={buttonRef}>
        <Hamburger size={24} toggled={toggle} toggle={onToggle} rounded />
      </div>
      <HamburgerMenu
        toggle={toggle}
        onClick={onToggle}
        height={isAuthenticated ? 292 : 160}
      >
        {children}
      </HamburgerMenu>
    </Wrapper>
  );
};
export default MobileHeader;

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
  background-color: ${({ theme }) => theme.palette.white};
  & > div:first-of-type {
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
  }
  ${media.pc} {
    display: none;
  }
`;

const HamburgerMenu = styled.div<{ toggle: boolean; height: number }>`
  height: ${({ toggle, height }) => (toggle ? height : 0)}px;
  transition: all 0.1s ease-in-out;
  overflow: hidden;
  ${({ theme, toggle }) =>
    toggle &&
    css`
      box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.05);
      border-bottom: 1px solid ${theme.palette.gray_200};
      border-radius: 0 0 16px 16px;
    `};
`;

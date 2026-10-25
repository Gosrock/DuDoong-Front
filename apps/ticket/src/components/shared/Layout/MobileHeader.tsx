import { media, Spacing, theme } from '@dudoong/ui';
import { useScrollEffect } from '@dudoong/utils';
import { css } from '@emotion/react';
import { authState } from '@store/auth';
import Hamburger from 'hamburger-react';
import { useRouter } from 'next/router';
import { PropsWithChildren, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Media from '../Media';

const MobileHeader = ({ children }: PropsWithChildren) => {
  const { asPath } = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useRecoilValue(authState);
  const [toggle, setToggle] = useState<boolean>(false);

  const [backgroundBlur, setBackgroundBlur] = useState(false);
  useScrollEffect({
    callback: (scrollTop) => {
      console.log(scrollTop);
      scrollTop > 20 ? setBackgroundBlur(true) : setBackgroundBlur(false);
    },
  });

  const onToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <div
        css={css(containerStyle, toggle && { borderRadius: '0 0 16px 16px' })}
      >
        <div
          css={css({
            backgroundColor:
              toggle || backgroundBlur ? '#FFFFFF99' : 'transparent',
            position: 'fixed',
            top: -1,
            width: '100%',
            height: 73,
          })}
        />
        <div ref={buttonRef} id="hamburger">
          <Hamburger
            size={24}
            toggled={toggle}
            toggle={onToggle}
            rounded
            color={
              asPath === '/' && !toggle && !backgroundBlur
                ? theme.palette.white
                : theme.palette.black
            }
          />
        </div>
        <div
          css={css(hamburgerMenuStyle(toggle, isAuthenticated ? 292 : 160), {
            backgroundColor: '#FFFFFF99',
          })}
          onClick={onToggle}
        >
          {children}
        </div>
      </div>
      <Media.Mobile>
        <Spacing size={72} />
      </Media.Mobile>
    </>
  );
};
export default MobileHeader;

const containerStyle = css`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  backdrop-filter: blur(25px);

  #hamburger {
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

const hamburgerMenuStyle = (toggle: boolean, height: number) => css`
  height: ${toggle ? height : 0}px;
  transition: all 0.1s ease-in-out;
  overflow: hidden;
  border-radius: 0 0 16px 16px;

  ${toggle &&
  css`
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid ${theme.palette.gray_200};
  `};
`;

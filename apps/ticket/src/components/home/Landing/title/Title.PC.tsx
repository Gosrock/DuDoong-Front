import { palette, Spacing, Text } from '@dudoong/ui';
import { css } from '@emotion/react';
import Logo from '@assets/landing-renewal/title-logo.svg';
import TitleIllustPc from '@assets/landing-renewal/title-illust-pc.svg';
import styled from '@emotion/styled';
import Star2 from '@assets/landing/star2.svg';

export const TitlePc = () => {
  return (
    <div
      css={css({
        position: 'relative',
        backgroundColor: palette.black,
        height: 938,
      })}
    >
      <Spacing size={164} />
      <Logo css={css({ width: 400, marginLeft: 124 })} />
      <Spacing size={25} />
      <Text typo={'G_Text_22_M'} color={'white'} css={css({ marginLeft: 124 })}>
        BAND CONCERT PLATFORM
      </Text>
      <TitleIllustPc css={css({ position: 'absolute', right: 0, top: -50 })} />
      <Spacing size={280} />
      <Line />
    </div>
  );
};

const Line = ({ ...props }) => {
  return (
    <Wrapper {...props}>
      <LineContainer>
        <div>
          <span>DUDOONG YOUR CONCERT LIFE</span>
          <Star2 />
        </div>
        <div>
          <span>DUDOONG YOUR CONCERT LIFE</span>
          <Star2 />
        </div>
        <div>
          <span>DUDOONG YOUR CONCERT LIFE</span>
          <Star2 />
        </div>
        <div>
          <span>DUDOONG YOUR CONCERT LIFE</span>
          <Star2 />
        </div>
        <div>
          <span>DUDOONG YOUR CONCERT LIFE</span>
          <Star2 />
        </div>
      </LineContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.black};
  height: 66px;
  font-family: 'Jost', sans-serif;
  font-style: italic;
  font-size: 33px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.white};
  letter-spacing: 0.1em;
  margin-top: 50px;
`;
const LineContainer = styled.div`
  width: 3500px;
  position: absolute;
  left: -630px;
  display: flex;
  align-items: center;

  span {
    padding-top: 4px;
  }
  svg {
    width: 46px;
    margin-left: 12px;
  }

  @keyframes textLoop {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    100% {
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }
  }

  & > div {
    animation: textLoop 10s linear infinite;
    display: flex;
    align-items: center;
    padding-right: 10px;
  }
`;

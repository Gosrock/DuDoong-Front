import { media } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Twinkle from '@dudoong/ui/src/assets/icons/Twinkle.svg';
import Dots from '@dudoong/ui/src/assets/image/Dots';
const HomeHeader = () => {
  return (
    <Wrapper>
      <div>
        <p>두둥과 함께하는 편리한 공연 라이프</p>
        <h1>
          두둥으로 다양한 공연을
          <br />
          확인하고 예매해보세요
        </h1>
        <div
          css={css`
            width: 54px;
          `}
        ></div>
      </div>

      <Twinkle className="twinkle" />
      <Twinkle className="twinkle" />
      <Dots className="dots" />
      <Dots className="dots" />
    </Wrapper>
  );
};
export default HomeHeader;

const Wrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    width: 100%;
  }

  p {
    ${({ theme }) => theme.typo.G_Side_14_M}
    color : ${({ theme }) => theme.palette.black};
    margin-top: 123px;
    ${media.mobile} {
      margin-top: 48px;
    }
  }
  h1 {
    ${({ theme }) => theme.typo.G_Header_28_B}
    margin-top:14px;
  }
  .twinkle {
    width: 66px;
    position: absolute;
    &:first-of-type {
      transform: translate3d(-172px, 0, 0);
      top: 110px;
    }
    &:nth-of-type(2) {
      transform: translate3d(172px, 0, 0);
      top: 188px;
    }
    ${media.mobile} {
      display: none;
    }
  }
  .dots {
    position: absolute;
    width: 100px;

    &:nth-last-of-type(2) {
      transform: translate3d(-450px, 0, 0);
      top: 38px;
    }
    &:last-of-type {
      transform: translate3d(450px, 0, 0);
      top: 283px;
    }

    ${media.mobile} {
      display: none;
    }
  }
`;

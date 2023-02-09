import { Input, Search, theme } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Twinkle from '@dudoong/ui/src/assets/icons/Twinkle.svg';
import Dots from '@dudoong/ui/src/assets/image/dots.svg';
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
        <Input
          height={60}
          styles={InputStyle}
          placeholder={'검색어를 입력해주세요'}
          rightIcon={<Search />}
        />
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
  height: 469px;
  max-width: 415px;
  margin: 0 auto;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 24px;

  & > div {
    width: 100%;
  }

  p {
    ${({ theme }) => theme.typo.G_Side_14_M}
    color : ${({ theme }) => theme.palette.black};
    margin-top: 123px;
  }
  h1 {
    ${({ theme }) => theme.typo.G_Header_28_B}
    margin-top:14px;
  }
  position: relative;
  .twinkle {
    position: absolute;
    &:first-of-type {
      left: 27px;
      top: 110px;
    }
    &:nth-of-type(2) {
      right: 32px;
      top: 188px;
    }
  }
  .dots {
    position: absolute;
    width: 100px;

    &:nth-last-of-type(2) {
      left: -17.3vw;
      top: 38px;
    }
    &:last-of-type {
      right: -17.3vw;
      top: 283px;
    }
  }
`;

const InputStyle = css`
  border-radius: 16px;
  border: 1px solid black;
  background-color: ${theme.palette.gray_100};
  color: ${theme.palette.black};
  margin-top: 50px;
  box-sizing: border-box;
  width: 100%;
`;

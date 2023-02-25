import styled from '@emotion/styled';
import Section1Illust from '@assets/landing/section1.svg';
import { media } from '@dudoong/ui';
const Section1 = () => {
  return (
    <Wrapper>
      <h2>
        두둥과 함께 편리한 <br />
        <span>공연 라이프</span>를 시작해보세요
      </h2>
      <Section1Description className="descriptionMobile" />
      <Section1Illust />
      <Section1Description className="descriptionPc" />
    </Wrapper>
  );
};

const Section1Description = ({ ...props }) => {
  return (
    <p {...props}>
      공연의 호스트가 되어 기록을 남겨보세요.
      <br />
      두둥이 지금까지와는 다른 새로운 공연 라이프를 열어줄 거예요.
    </p>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    text-align: center;

    font-family: 'Gmarket Sans';
    font-weight: 700;

    font-size: 45px;
    line-height: 1.3;
    margin-top: 118px;
    ${media.mobile} {
      font-size: 24px;
      margin-top: 69px;
    }

    & > span {
      background: linear-gradient(
        180deg,
        #25f3cf00 43.11%,
        #25f3cf 43.12%,
        #25f3cf 89.99%,
        #25f3cf00 90%
      );
    }
  }

  svg {
    margin-top: 61px;
    width: 708px;

    ${media.mobile} {
      width: calc(100% - 48px);
      padding: 0 24px;
      margin-top: 70px;
      margin-bottom: 85px;
    }
  }

  p {
    font-family: 'Pretendard';
    text-align: center;
    font-weight: 500;

    font-size: 20px;
    line-height: 150%;
    margin-top: 76px;
    margin-bottom: 85px;
    ${media.mobile} {
      font-size: 14px;
      margin-top: 24px;
      margin-bottom: 0;
    }
  }
  .descriptionMobile {
    display: none;
  }
  ${media.mobile} {
    .descriptionPc {
      display: none;
    }
    .descriptionMobile {
      display: inherit;
    }
  }
`;
export default Section1;

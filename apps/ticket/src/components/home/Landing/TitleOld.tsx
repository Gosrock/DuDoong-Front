import styled from '@emotion/styled';
import { media, Text } from '@dudoong/ui';
import Logo from '@assets/landing/title.svg';
import DoondDoongz from '@assets/landing/doongdoongz.svg';
import Star from '@assets/landing/star.svg';
import Twinkle from '@dudoong/ui/src/assets/icons/Twinkle.svg';
import ScrollArrowPc from '@assets/landing/scrollArowPc.svg';
import ScrollArrowMobile from '@assets/landing/scrollArowMobile.svg';
import Line from './Line';

const Title = () => {
  return (
    <Wrapper>
      <Description as="div">두둥과 함께하는 편리한 공연준비</Description>
      <Logo className="logo" />
      <Scroll>
        <ScrollArrowMobile className="scrollArrowMobile" />
        <ScrollArrowPc className="scrollArrowPc" />
        <Text typo="G_Side_15_M" as="div">
          SCROLL
        </Text>
      </Scroll>
      <Line />
      <Twinkle className="twinkle" />
      <Star className="star" />
      <DoondDoongz className="doongdoongz" />
    </Wrapper>
  );
};
export default Title;

const Wrapper = styled.div`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;

  .logo {
    margin: 0 auto;
    padding: 0 24px;
    padding-top: 58px;
    max-width: 443px;
    ${media.mobile} {
      padding-top: 48px;
      width: calc(100% - 48px);
      max-width: 335px;
    }
  }
  .twinkle {
    position: absolute;

    top: 390px;
    transform: translate3d(-270px, 0, 0);
    width: 104px;

    ${media.mobile} {
      display: none;
    }
  }
  .star {
    position: absolute;
    top: 120px;
    transform: translate3d(330px, 0, 0);
    ${media.mobile} {
      display: none;
    }
  }
  .doongdoongz {
    position: absolute;
    top: 539px;
    transform: translate3d(305px, 0, 0);
    ${media.mobile} {
      display: none;
    }
  }
`;

const Description = styled.div`
  margin: 0 auto;

  padding-top: 120px;
  font-family: 'Gmarket Sans';
  font-size: 24px;
  font-weight: 500;

  ${media.mobile} {
    padding-top: 110px;
    font-family: 'Gmarket Sans';
    font-size: 20px;
    font-weight: 500;
  }
`;

const Scroll = styled.div`
  display: flex;
  margin-top: 83px;
  align-items: center;
  flex-direction: column-reverse;
  gap: 8px;
  ${media.mobile} {
  }
  .scrollArrowPc {
    display: none;
  }
  //PC
  ${media.custom(1320)} {
    flex-direction: row;
    position: absolute;
    top: 508px;
    right: 48px;
    div {
      transform: rotate(90deg);
    }
    .scrollArrowPc {
      position: absolute;
      top: -24px;
      display: inherit;
    }
    .scrollArrowMobile {
      display: none;
    }
  }
`;

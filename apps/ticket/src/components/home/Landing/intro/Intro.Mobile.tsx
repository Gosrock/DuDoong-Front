import IntroTitleMobile from '@assets/landing-renewal/intro-title-mobile.svg';
import { FlexBox, Padding, Spacing, Text } from '@dudoong/ui';
import { css } from '@emotion/react';
import { backgroundBlackStyle } from '../backgroundBlackStyle';

export const IntroMobile = () => {
  return (
    <Padding size={[0, 0, 0, 36]} css={backgroundBlackStyle}>
      <FlexBox direction="column" align={'flex-start'}>
        <Spacing size={120} />
        <IntroTitleMobile />
        <Spacing size={30} />
        <Text typo={'P_Text_18_M'} color="white">
          두둥은 <span css={boldTextStyle}>모든 밴드</span>를 위한
          <br />
          공연 플랫폼 이에요.
        </Text>
        <Spacing size={8} />
        <Text typo={'P_Text_18_M'} color="white">
          공연의 호스트와 관객
          <br />
          모두에게
          <span css={boldTextStyle}>
            더욱 편리하고 새로운
            <br />
            공연 라이프
          </span>
          를 펼쳐줄거예요!
        </Text>
        <Spacing size={143} />
      </FlexBox>
    </Padding>
  );
};

const boldTextStyle = css({ fontWeight: 'bold' });

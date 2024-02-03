import IntroTitlePC from '@assets/landing-renewal/intro-title-pc.svg';
import { FlexBox, Spacing, Text } from '@dudoong/ui';
import { css } from '@emotion/react';

export const IntroPC = () => {
  return (
    <FlexBox justify={'center'} direction="column">
      <Spacing size={200} />
      <IntroTitlePC />
      <Spacing size={56} />
      <Text typo={'P_Text_22_M'}>
        두둥은 <span css={boldTextStyle}>모든 밴드를 위한 공연 플랫폼</span>
        이에요.
      </Text>
      <Spacing size={8} />
      <Text typo={'P_Text_22_M'}>
        공연의 호스트와 관객 모두에게{' '}
        <span css={boldTextStyle}>더욱 편리하고 새로운 공연 라이프</span>를
        펼쳐줄거예요!
      </Text>
      <Spacing size={96} />
    </FlexBox>
  );
};

const boldTextStyle = css({ fontWeight: 'bold' });

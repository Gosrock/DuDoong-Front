import { Spacing, Text } from '@dudoong/ui';
import { css } from '@emotion/react';
import Logo from '@assets/landing-renewal/title-logo.svg';
import TitleIllustMobile from '@assets/landing-renewal/title-illust-mobile.svg';
import { backgroundBlackStyle } from '.';

export const TitleMobile = () => {
  return (
    <div css={backgroundBlackStyle}>
      <Spacing size={12} />
      <Logo css={css({ marginLeft: 24, width: 231 })} />
      <Spacing size={22} />
      <div css={css({ marginLeft: 24 })}>
        <Text typo={'G_Text_22_M'} color={'white'}>
          BAND CONCERT
          <br />
          PLATFORM
        </Text>
      </div>
      <TitleIllustMobile />
    </div>
  );
};

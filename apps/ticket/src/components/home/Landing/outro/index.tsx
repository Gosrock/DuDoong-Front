import { FlexBox, palette, Spacing, Text } from '@dudoong/ui';
import Media from '@components/shared/Media';
import { css } from '@emotion/react';
import { darken } from 'polished';

export const Outro = () => (
  <FlexBox direction={'column'} css={css({ zIndex: -1 })}>
    <Media.Spacing mobile={176} pc={220} />
    <Media.Txt mobile={'G_Header_36_B'} pc={'G_Header_45_B'}>
      이 모든 서비스를
    </Media.Txt>
    <Media.Txt mobile={'G_Header_36_B'} pc={'G_Header_45_B'}>
      무료로 사용해보세요
    </Media.Txt>
    <Spacing size={12} />
    <Text typo={'P_Text_18_M'} css={css({ fontSize: 20 })}>
      제휴를 통해 카드 결제도 가능해요
    </Text>
    <Spacing size={32} />
    <div css={css({ position: 'relative' })}>
      <button
        css={buttonStyle}
        onClick={() => (window.location.href = 'https://dudoong.com/home')}
      >
        <Text typo={'P_Header_24_B'}>두둥 시작하기</Text>
      </button>
      <div
        css={css`
          position: absolute;
          width: 240px;
          height: 68px;
          top: 6px;
          right: -6px;
          border-radius: 12px;
          background-color: ${palette.black};
        `}
      />
    </div>
    <Media.Spacing mobile={210} pc={230} />
  </FlexBox>
);

const buttonStyle = css`
  position: relative;
  width: 242px;
  height: 70px;
  border-radius: 12px;
  border: 2px solid ${palette.black};
  background-color: ${palette.point_mint};
  color: ${palette.black};
  z-index: 2;

  &:active {
    transform: translate3d(6px, 3px, 0);
    transition: 0.1s ease-out;
    background-color: ${darken(0.03, palette.point_mint)};
  }
`;

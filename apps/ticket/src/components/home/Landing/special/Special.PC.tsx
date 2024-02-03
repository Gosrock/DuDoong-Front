import { FlexBox, palette, Spacing, Text } from '@dudoong/ui';
import StarMint from '@assets/landing-renewal/star-mint.svg';
import StarWhite from '@assets/landing-renewal/star-white.svg';
import SpecialFirst from '@assets/landing-renewal/special-1.svg';
import SpecialSecond from '@assets/landing-renewal/special-2.svg';
import SpecialThird from '@assets/landing-renewal/special-3.svg';
import SpecialFourth from '@assets/landing-renewal/special-4.svg';
import { css } from '@emotion/react';
import { backgroundBlackStyle } from '../backgroundBlackStyle';
import { ImpressionStartSetHeader } from '../ImpressionStartSetHeader';

export const SpecialPC = () => {
  return (
    <FlexBox direction={'column'} css={backgroundBlackStyle} justify="center">
      <Spacing size={160} />
      <FlexBox justify={'center'}>
        <StarMint />
        <StarWhite />
        <Text
          typo="G_Header_28_B"
          css={css({ fontSize: 96, margin: '0 13.5px' })}
          color="point_mint"
        >
          두둥 SPECIAL
        </Text>
        <StarWhite />
        <StarMint />
      </FlexBox>
      <Spacing size={160} />
      <div css={css({ width: 936 })}>
        <FlexBox justify={'space-between'}>
          <ContentSection
            number={1}
            subTitle={'ONLY DUDOONG'}
            title={'수수료 ZERO 두둥티켓'}
            description={
              '두둥티켓은 수수료 없이 온라인으로 입금받고\n주문을 승인할 수 있는 두둥만의 서비스에요!'
            }
          />
          <div css={css({ width: 459 })}>
            <SpecialFirst />
          </div>
        </FlexBox>
        <Spacing size={100} />
        <FlexBox justify={'flex-start'} gap={80}>
          <div css={css({ width: 459 })}>
            <SpecialSecond />
          </div>
          <ContentSection
            number={2}
            subTitle={'CHEER UP'}
            title={'응원톡 남기기'}
            description={
              '두둥의 응원톡 기능을 통해 좋아하는\n밴드에게 응원의 메세지를 보내보세요!'
            }
          />
        </FlexBox>
        <Spacing size={100} />
        <FlexBox justify={'space-between'}>
          <ContentSection
            number={3}
            subTitle={'QUICK ENTRANCE'}
            title={'QR티켓 입장'}
            description={
              '두둥을 통해 예매한 관객은\nQR 티켓을 통해 간단하게 입장이 가능해요!'
            }
          />
          <div css={css({ width: 459 })}>
            <SpecialThird />
          </div>
        </FlexBox>
        <Spacing size={100} />
        <FlexBox justify={'flex-start'} gap={80}>
          <div css={css({ width: 459 })}>
            <SpecialFourth />
          </div>
          <ContentSection
            number={4}
            subTitle={'VARIOUS OPTIONS'}
            title={'다양한 티켓옵션'}
            description={
              '두둥의 티켓은 원하는 옵션을 붙일 수 있어\n다양한 맞춤형 티켓 제작이 용이해요!'
            }
          />
        </FlexBox>
      </div>
      <ImpressionStartSetHeader color="black">
        <Spacing size={190} />
      </ImpressionStartSetHeader>
    </FlexBox>
  );
};

export const ContentSection = ({
  number,
  subTitle,
  title,
  description,
}: {
  number: number;
  subTitle: string;
  title: string;
  description: string;
}) => {
  return (
    <FlexBox direction={'column'} align="flex-start">
      <FlexBox gap={15}>
        <FlexBox
          css={css({
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: palette.point_mint,
            color: palette.white,
          })}
        >
          <Text typo="G_Header_20_B">{number}</Text>
        </FlexBox>
        <Text
          typo="G_Header_24_B"
          css={css({ fontSize: 22 })}
          color={'point_mint'}
        >
          {subTitle}
        </Text>
      </FlexBox>
      <Spacing size={18} />
      <Text typo="G_Header_24_B" css={css({ fontSize: 40 })} color={'white'}>
        {title}
      </Text>
      <Spacing size={20} />
      <Text typo="P_Text_22_M" css={css({ lineHeight: 1.3 })} color={'white'}>
        {description}
      </Text>
    </FlexBox>
  );
};

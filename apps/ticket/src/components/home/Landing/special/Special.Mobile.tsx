import { FlexBox, palette, Spacing, Text } from '@dudoong/ui';
import SpecialFirst from '@assets/landing-renewal/special-1.svg';
import SpecialSecond from '@assets/landing-renewal/special-2.svg';
import SpecialThird from '@assets/landing-renewal/special-3.svg';
import SpecialFourth from '@assets/landing-renewal/special-4.svg';
import { css } from '@emotion/react';
import { backgroundBlackStyle } from '../backgroundBlackStyle';
import { ReactNode } from 'react';
import { ImpressionStartSetHeader } from '../ImpressionStartSetHeader';

export const SpecialMobile = () => {
  return (
    <FlexBox direction={'column'} css={backgroundBlackStyle} justify="center">
      <Spacing size={80} />

      <div css={css({ width: '100%' })}>
        <ContentSection
          number={1}
          subTitle={'ONLY DUDOONG'}
          title={'수수료 ZERO 두둥티켓'}
          image={<SpecialFirst />}
          description={
            '두둥티켓은 수수료 없이 온라인으로 입금받고\n주문을 승인할 수 있는 두둥만의 서비스에요!'
          }
        />
        <Spacing size={80} />
        <ContentSection
          number={2}
          subTitle={'CHEER UP'}
          title={'응원톡 남기기'}
          image={<SpecialSecond />}
          description={
            '두둥의 응원톡 기능을 통해 좋아하는\n밴드에게 응원의 메세지를 보내보세요!'
          }
        />
        <Spacing size={80} />
        <ContentSection
          number={3}
          subTitle={'QUICK ENTRANCE'}
          title={'QR티켓 입장'}
          image={<SpecialThird />}
          description={
            '두둥을 통해 예매한 관객은\nQR 티켓을 통해 간단하게 입장이 가능해요!'
          }
        />
        <Spacing size={80} />
        <ContentSection
          number={4}
          subTitle={'VARIOUS OPTIONS'}
          title={'다양한 티켓옵션'}
          image={<SpecialFourth />}
          description={
            '두둥의 티켓은 원하는 옵션을 붙일 수 있어\n다양한 맞춤형 티켓 제작이 용이해요!'
          }
        />
      </div>
      <ImpressionStartSetHeader color="black">
        <Spacing size={120} />
      </ImpressionStartSetHeader>
    </FlexBox>
  );
};

export const ContentSection = ({
  number,
  subTitle,
  title,
  description,
  image,
}: {
  number: number;
  subTitle: string;
  title: string;
  description: string;
  image: ReactNode;
}) => {
  return (
    <FlexBox direction={'column'}>
      <FlexBox
        css={css({
          width: 40,
          height: 40,
          borderRadius: 25,
          backgroundColor: palette.point_mint,
          color: palette.white,
        })}
      >
        <Text typo="G_Header_28_B">{number}</Text>
      </FlexBox>
      <Spacing size={10} />
      <FlexBox gap={15}>
        <Text
          typo="G_Side_14_B"
          css={css({ fontSize: 22 })}
          color={'point_mint'}
        >
          {subTitle}
        </Text>
      </FlexBox>
      <Spacing size={13} />
      <Text typo="G_Header_28_B" color={'white'}>
        {title}
      </Text>
      <Spacing size={13} />
      <div css={css({ width: 'calc(100% - 140px)' })}>{image}</div>
      <Spacing size={26} />
      <Text
        typo="P_Text_16_M"
        css={css({ lineHeight: 1.3, textAlign: 'center' })}
        color={'white'}
      >
        {description}
      </Text>
    </FlexBox>
  );
};

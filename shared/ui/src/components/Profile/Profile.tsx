/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';
import { ListRow } from '../../layout';
import { TextType } from '../../theme';
import { Text } from '../Text';
import { ProfileImage } from './ProfileImage';

export interface ProfileProps extends ComponentProps<'div'> {
  size: ProfileSizeKey;
  image?: string;
  name: string;
  alliance?: boolean;
  subText?: string;
}

type ProfileSizeKey = 'big' | 'small';

type ProfileSizeType = {
  [key in ProfileSizeKey]: {
    imageSize: 36 | 49;
    name: TextType;
    sub: TextType;
  };
};

const PROFILE_SIZE: ProfileSizeType = {
  big: {
    imageSize: 49,
    name: {
      typo: 'P_Text_18_SB',
      color: 'black',
    },
    sub: {
      typo: 'P_Text_16_R',
      color: 'gray_400',
    },
  },
  small: {
    imageSize: 36,
    name: {
      typo: 'G_Side_14_M',
      color: 'black',
    },
    sub: {
      typo: 'P_Text_12_R',
      color: 'gray_400',
    },
  },
};

export const Profile = ({
  size,
  image,
  name,
  subText,
  alliance = false,
  ...props
}: ProfileProps) => {
  return (
    <ListRow
      {...props}
      textGap={0}
      leftImage={
        <ProfileImage
          size={PROFILE_SIZE[size].imageSize}
          imageUrl={image}
          alliance={alliance}
        />
      }
      text={
        <Text
          css={
            size === 'small' &&
            css`
              line-height: 100% !important;
            `
          }
          typo={PROFILE_SIZE[size].name.typo}
          color={PROFILE_SIZE[size].name.color}
        >
          {name}
        </Text>
      }
      subText={
        subText && (
          <SubText
            alliance={alliance}
            typo={PROFILE_SIZE[size].sub.typo}
            color={PROFILE_SIZE[size].sub.color}
          >
            {subText}
          </SubText>
        )
      }
      imageTextGap={size === 'big' ? 16 : 12}
      padding={0}
    />
  );
};

const SubText = styled(Text)<{ alliance: boolean }>`
  line-height: 100% !important;
  position: relative;

  ${({ alliance }) =>
    alliance &&
    css`
      &:after {
        content: '';
        position: absolute;
        background: url("data:image/svg+xml,%3Csvg width='7' height='10' viewBox='0 0 7 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.46961 0.0423785C5.59525 0.115452 5.65392 0.265496 5.61118 0.404411L4.48561 4.0625H6.56249C6.68717 4.0625 6.79991 4.13661 6.84936 4.25105C6.89881 4.3655 6.8755 4.49839 6.79006 4.58918L1.79007 9.90167C1.69045 10.0075 1.53102 10.0307 1.40539 9.95762C1.27975 9.88455 1.22108 9.7345 1.26382 9.59559L2.38939 5.9375H0.312507C0.187833 5.9375 0.0750887 5.86339 0.0256392 5.74895C-0.0238103 5.6345 -0.00050215 5.50161 0.0849445 5.41082L5.08493 0.0983331C5.18455 -0.00750458 5.34398 -0.030695 5.46961 0.0423785ZM1.03576 5.3125H2.8125C2.91167 5.3125 3.00496 5.35957 3.06387 5.43934C3.12279 5.51911 3.14035 5.62212 3.11118 5.7169L2.25671 8.49394L5.83924 4.6875H4.0625C3.96333 4.6875 3.87005 4.64043 3.81113 4.56066C3.75221 4.48089 3.73465 4.37788 3.76382 4.2831L4.61829 1.50606L1.03576 5.3125Z' fill='%236B36DC'/%3E%3Cpath d='M4.16665 4.66632H5.45953L2.58954 7.53631L2.98506 5.95425L3.14038 5.33298H2.49999H1.20711L4.07709 2.463L3.68157 4.04506L3.52626 4.66632H4.16665Z' fill='%236B36DC' stroke='%236B36DC'/%3E%3C/svg%3E")
          no-repeat;
        display: inline-block;
        width: 8.25px;
        height: 12px;
        top: 2px;
        margin-left: 2px;
      }
    `}
`;

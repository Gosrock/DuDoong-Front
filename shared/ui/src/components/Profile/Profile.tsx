/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ListRow } from '../../layout';
import { TextType } from '../../theme';
import { Text } from '../Text';
import { ProfileImage } from './ProfileImage';

export interface ProfileProps {
  size: ProfileSizeKey;
  image?: string;
  name: string;
  alliance?: boolean;
  subText?: string;
}

type ProfileSizeKey = 'big' | 'small';

type ProfileSizeType = {
  [key in ProfileSizeKey]: {
    imageSize: 44 | 68;
    name: TextType;
    sub: TextType;
  };
};

const PROFILE_SIZE: ProfileSizeType = {
  big: {
    imageSize: 68,
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
    imageSize: 44,
    name: {
      typo: 'P_Text_16_M',
      color: 'black',
    },
    sub: {
      typo: 'P_Text_14_R',
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
}: ProfileProps) => {
  return (
    <ListRow
      leftImage={
        <ProfileImage
          size={PROFILE_SIZE[size].imageSize}
          imageUrl={image}
          alliance={alliance}
        />
      }
      text={
        <Text
          css={css`
            line-height: 100% !important;
          `}
          typo={PROFILE_SIZE[size].name.typo}
          color={PROFILE_SIZE[size].name.color}
        >
          {name}
        </Text>
      }
      subText={
        subText && (
          <Text
            css={css`
              line-height: 100% !important;
              position: relative;
              &:after {
                content: '';
                position: absolute;
                background: url("data:image/svg+xml,%3Csvg width='16' height='14' viewBox='0 0 16 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.3083 7C7.93931 8.25844 6.17914 10.4311 5.44417 13.0223L5.36566 13.2991L5.28714 13.0223C4.55217 10.4311 2.792 8.25845 0.42302 7C2.792 5.74156 4.55217 3.5689 5.28714 0.977684L5.36566 0.700864L5.44417 0.977684C6.17914 3.5689 7.93932 5.74155 10.3083 7Z' fill='%230EF8CF' stroke='black' stroke-width='0.382496'/%3E%3Cpath d='M15.0396 7C12.6706 8.25845 10.9105 10.4311 10.1755 13.0223L10.097 13.2991L10.0185 13.0223C9.28349 10.4311 7.52332 8.25845 5.15434 7C7.52332 5.74156 9.28349 3.5689 10.0185 0.977684L10.097 0.700864L10.1755 0.977684C10.9105 3.5689 12.6706 5.74155 15.0396 7Z' fill='white' stroke='black' stroke-width='0.382496'/%3E%3C/svg%3E%0A")
                  no-repeat;
                display: inline-block;
                width: 16px;
                height: 14px;
                top: 1px;
                margin-left: 2px;
              }
            `}
            typo={PROFILE_SIZE[size].sub.typo}
            color={PROFILE_SIZE[size].sub.color}
          >
            {subText}
          </Text>
        )
      }
      imageTextGap={size === 'big' ? 35 : 12}
      padding={0}
    />
  );
};

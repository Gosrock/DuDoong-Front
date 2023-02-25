/** @jsxImportSource @emotion/react */
import { Padding, FlexBox } from '../../layout';
import { Text } from '../Text';
import { TextType } from '../../theme';
import { KeyOfPalette, KeyOfTypo } from '../../theme';
import { PaddingSize } from '../../layout';
import { ReactNode } from 'react';
import { css } from '@emotion/react';

export interface ListHeaderProps {
  title: JSX.Element | string;
  description?: JSX.Element | string;
  size: ListHeaderVariantKey;
  descTypo?: KeyOfTypo;
  descColor?: KeyOfPalette;
  padding?: PaddingSize;
  rightElement?: ReactNode;
  gap?: number;
}

export type ListHeaderVariantKey =
  | 'listHeader_18'
  | 'listHeader_20'
  | 'listHeader_24'
  | 'listHeader_28';

type ListHeaderVariantType = {
  [key in ListHeaderVariantKey]: {
    textProp: TextType;
    subTextProp: TextType;
    padding: PaddingSize;
    gap: number;
  };
};

const LIST_HEADER_VARIANT: ListHeaderVariantType = {
  listHeader_18: {
    textProp: {
      typo: 'P_Header_18_SB',
      color: 'black',
    },
    subTextProp: {
      typo: 'P_Text_16_M',
      color: 'gray_400',
    },
    padding: [32, 24, 12, 24],
    gap: 10,
  },
  listHeader_20: {
    textProp: {
      typo: 'P_Header_20_B',
      color: 'black',
    },
    subTextProp: {
      typo: 'P_Text_16_M',
      color: 'gray_400',
    },
    padding: [32, 24, 16, 24],
    gap: 20,
  },
  listHeader_24: {
    textProp: {
      typo: 'P_Header_24_B',
      color: 'black',
    },
    subTextProp: {
      typo: 'P_Text_16_M',
      color: 'gray_400',
    },
    padding: [32, 24, 16, 24],
    gap: 20,
  },
  listHeader_28: {
    textProp: {
      typo: 'P_Header_28_B',
      color: 'black',
    },
    subTextProp: {
      typo: 'P_Text_16_M',
      color: 'gray_400',
    },
    padding: [32, 24, 20, 24],
    gap: 20,
  },
};

export const ListHeader = ({
  description,
  size = 'listHeader_24',
  title,
  descColor,
  descTypo,
  padding = LIST_HEADER_VARIANT[size].padding,
  rightElement = <></>,
  gap,
  ...props
}: ListHeaderProps) => {
  return (
    <Padding size={padding} {...props}>
      <FlexBox
        align="left"
        gap={size ? LIST_HEADER_VARIANT[size].gap : gap}
        justify="center"
        direction="column"
      >
        <FlexBox
          id="title"
          align="center"
          justify={'space-between'}
          css={css`
            min-height: 24px; // md tag 넣었을때 문제 안생기도록
          `}
        >
          <Text
            typo={LIST_HEADER_VARIANT[size].textProp.typo}
            color={LIST_HEADER_VARIANT[size].textProp.color}
          >
            {title}
          </Text>
          {rightElement}
        </FlexBox>
        {description && (
          <CustomText
            text={description}
            typo={descTypo || LIST_HEADER_VARIANT[size].subTextProp.typo}
            color={descColor || LIST_HEADER_VARIANT[size].subTextProp.color}
          />
        )}
      </FlexBox>
    </Padding>
  );
};

const isString = (text: any): text is string => {
  return typeof text === 'string';
};

const CustomText = ({
  text,
  typo,
  color,
}: {
  text: JSX.Element | string;
  typo: KeyOfTypo;
  color: KeyOfPalette;
}) => {
  return (
    <>
      {isString(text) ? (
        <Text typo={typo} color={color}>
          {text}
        </Text>
      ) : (
        <>{text}</>
      )}
    </>
  );
};

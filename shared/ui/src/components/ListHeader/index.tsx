/** @jsxImportSource @emotion/react */
import { Padding, FlexBox } from '../../layout';
import { Text } from '../Text';
import { TextType } from '../../theme';
import { KeyOfPalette, KeyOfTypo } from '../../theme';
import { PaddingSize } from '../../layout';
import { ReactNode } from 'react';

type TextTypo = KeyOfTypo | [KeyOfTypo, KeyOfTypo];
type TextColor = KeyOfPalette | [KeyOfPalette, KeyOfPalette];

export interface ListHeaderProps {
  title: JSX.Element | string;
  description?: JSX.Element | string;
  variant?: ListHeaderTypo;
  descTypo?: TextTypo;
  descColor?: TextColor;
  padding?: PaddingSize;
  rightElement?: ReactNode;
  gap?: number;
  tag?: boolean;
}

type ListHeaderTypo =
  | 'listHeader_18'
  | 'listHeader_20'
  | 'listHeader_24'
  | 'listHeader_28';

type ListHeaderTextType = {
  [key in ListHeaderTypo]: {
    textProp: TextType;
    padding: PaddingSize;
    gap: number;
  };
};

const listHeaderText: ListHeaderTextType = {
  listHeader_18: {
    textProp: {
      typo: 'Text_18_SB',
      color: 'black',
    },
    padding: [32, 24, 12, 24],
    gap: 10,
  },
  listHeader_20: {
    textProp: {
      typo: 'Header_20',
      color: 'black',
    },
    padding: [32, 24, 16, 24],
    gap: 20,
  },
  listHeader_24: {
    textProp: {
      typo: 'Header_24',
      color: 'black',
    },
    padding: [32, 24, 16, 24],
    gap: 20,
  },
  listHeader_28: {
    textProp: {
      typo: 'Header_28',
      color: 'black',
    },
    padding: [32, 24, 20, 24],
    gap: 20,
  },
};

export const ListHeader = ({
  description,
  variant = 'listHeader_24',
  title,
  descColor = [listHeaderText[variant].textProp.color, 'gray_500'],
  descTypo = [listHeaderText[variant].textProp.typo, 'Text_16'],
  padding = listHeaderText[variant].padding,
  rightElement = <></>,
  gap,
}: ListHeaderProps) => {
  return (
    <Padding size={padding}>
      <FlexBox
        align="left"
        gap={variant ? listHeaderText[variant].gap : gap}
        justify="center"
        direction="column"
      >
        <FlexBox id="title" align="center" justify={'space-between'}>
          <CustomText
            text={title}
            typo={getTextTypo(descTypo, 0)}
            color={getTextColor(descColor, 0)}
          />
          {rightElement}
        </FlexBox>
        {description && (
          <CustomText
            text={description}
            typo={getTextTypo(descTypo, 1)}
            color={getTextColor(descColor, 1)}
          />
        )}
      </FlexBox>
    </Padding>
  );
};

const getTextTypo = (arg: TextTypo, index: 0 | 1): KeyOfTypo => {
  if (arg.length === 2) {
    return arg[index] as KeyOfTypo;
  } else {
    return arg as KeyOfTypo;
  }
};

const getTextColor = (arg: TextColor, index: 0 | 1): KeyOfPalette => {
  if (arg.length === 2) {
    return arg[index] as KeyOfPalette;
  } else {
    return arg as KeyOfPalette;
  }
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

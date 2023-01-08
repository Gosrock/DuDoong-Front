/** @jsxImportSource @emotion/react */
import { Padding, FlexBox } from '../../layout';
import { Text } from '../Text';
import { TextType } from '../../theme';
import { KeyOfPalette, KeyOfTypo } from '../../theme';
import { PaddingSize } from '../../layout';
import { ReactNode } from 'react';

export interface ListHeaderProps {
  title: JSX.Element | string;
  description?: JSX.Element | string;
  size?: ListHeaderTypo;
  descTypo?: KeyOfTypo;
  descColor?: KeyOfPalette;
  padding?: PaddingSize;
  rightElement?: ReactNode;
  gap?: number;
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
  size = 'listHeader_24',
  title,
  descColor = 'gray_500',
  descTypo = 'Text_16',
  padding = listHeaderText[size].padding,
  rightElement = <></>,
  gap,
}: ListHeaderProps) => {
  return (
    <Padding size={padding}>
      <FlexBox
        align="left"
        gap={size ? listHeaderText[size].gap : gap}
        justify="center"
        direction="column"
      >
        <FlexBox id="title" align="center" justify={'space-between'}>
          <Text
            typo={listHeaderText[size].textProp.typo}
            color={listHeaderText[size].textProp.color}
          >
            {title}
          </Text>
          {rightElement}
        </FlexBox>
        {description && (
          <CustomText text={description} typo={descTypo} color={descColor} />
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

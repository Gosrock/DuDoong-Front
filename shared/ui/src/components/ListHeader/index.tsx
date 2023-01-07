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
    title:JSX.Element | string,
    description?: JSX.Element | string;
    typo?: ListHeaderTypo;
    textTypo?: TextTypo;
    textColor?: TextColor;
    padding?: PaddingSize;
    rightElement?: ReactNode;
    gap?: number;
    tag?:boolean;
}

type ListHeaderTypo =
  | 'listHeader_18'
  | 'listHeader_20'
  | 'listHeader_24'
  | 'listHeader_28';

type ListHeaderTextType = {
    [key in ListHeaderTypo]: {
        textProp : TextType;
        padding: PaddingSize;
    };
};

const listHeaderText: ListHeaderTextType = {
    'listHeader_18' : {
        textProp: {
            typo : 'Text_18_SB',
            color : 'black',
            },
        padding : [32, 24, 12, 24]
    },
    'listHeader_20' : {
        textProp: {
            typo : 'Header_20',
            color : 'black',
        },
        padding : [32, 24, 16, 24]
    },
    'listHeader_24' : {
        textProp: {
            typo : 'Header_24',
            color : 'black',
        },
        padding : [32, 24, 16, 24]
    },
    'listHeader_28' : {
        textProp: {
            typo : 'Header_28',
            color : 'black',
        },
        padding : [32, 24, 20, 24]
    }
}

export const ListHeader = ({
    description = '제목에 대한 설명이 들어가는 자리입니다. 이런식으로 두줄로 쓸 수 있습니다.',
    typo = 'listHeader_24',
    title='큰 제목',
    textColor = [listHeaderText[typo].textProp.color, 'gray_500'], 
    textTypo = [listHeaderText[typo].textProp.typo, 'Text_16'],
    padding = listHeaderText[typo].padding,
    rightElement = <></>,
    gap = 10,
    tag = false,
}: ListHeaderProps) => {
    return (
            <Padding size = {padding}>
                <FlexBox align='left' gap={description ? gap : '0'} justify='center' direction='column'>
                    <FlexBox id="title" align="center" justify={'space-between'}>
                            {title && (
                                <CustomText
                                    text={title}
                                    typo={getTextTypo(textTypo, 0)}
                                    color={getTextColor(textColor, 0)}
                                />
                            )}
                            {tag && rightElement }
                        </FlexBox>
                    {description && (
                            <CustomText
                                text={description}
                                typo={getTextTypo(textTypo, 1)}
                                color={getTextColor(textColor, 1)}
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
  

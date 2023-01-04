import { FlexBox, Padding, PaddingSize } from '..';
import { ReactNode } from 'react';
import { Text } from '../../components/Text';
import { KeyOfPalette, KeyOfTypo } from '../../theme';

/**
 * @paddingSize 버튼 셋의 패딩
 * number : 상하좌우 패딩
 * [number,number] : 상하, 좌우
 * [number,number,number,number] : 상, 우, 하, 좌
 * @param text : 컴포넌트에 들어갈 text (기본값 : '')
 * @param subtext : text 밑에 위치할 subtext (기본값 : '')
 * @param texttypo : text 글자 크기 (기본값 : ['Text_18', 'Text_16'])
 * [KeyOfTypo] : text typo
 * [KeyOfTypo, KeyOfTypo] : text typo, subtext typo
 * @param textcolor : text 글자 크기 (기본값 : ['black', 'gray_400'])
 * [KeyOfPalette] : text color
 * [KeyOfPalette, KeyOfPalette] : text color, subtext color
 * @param imageURL : 왼쪽에 들어갈 이미지 URL (기본값 : '')
 * @param rightElement : 오른쪽에 위치시킬 element (기본값 : <></>)
 */

export type TextTypo = KeyOfTypo | [KeyOfTypo, KeyOfTypo];
export type TextColor = KeyOfPalette | [KeyOfPalette, KeyOfPalette];

export interface ListRowProps {
  paddingSize: PaddingSize;
  text: JSX.Element | string;
  subText?: JSX.Element | string;
  textTypo?: TextTypo;
  textColor?: TextColor;
  leftImage?: ReactNode;
  rightElement?: ReactNode;
}

export const ListRow = ({
  paddingSize,
  text,
  subText,
  textTypo = ['Text_18', 'Text_16'],
  textColor = ['gray_500', 'gray_400'],
  leftImage,
  rightElement = <></>,
}: ListRowProps) => {
  return (
    <Padding size={paddingSize}>
      <FlexBox align={'center'} justify={'space-between'}>
        <FlexBox align="center" justify={'flex-start'} gap={16}>
          {leftImage}
          <FlexBox direction={'column'} align={'left'}>
            <>
              <CustomText
                text={text}
                typo={getTextTypo(textTypo, 0)}
                color={getTextColor(textColor, 0)}
              />
              {subText && (
                <CustomText
                  text={subText}
                  typo={getTextTypo(textTypo, 1)}
                  color={getTextColor(textColor, 1)}
                />
              )}
            </>
          </FlexBox>
        </FlexBox>
        {rightElement}
      </FlexBox>
    </Padding>
  );
};

// ------------------------------------------------------

const isString = (text: any): text is string => {
  return typeof text === 'string'; // T of F
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

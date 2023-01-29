/** @jsxImportSource @emotion/react */
import { FlexBox, Padding, PaddingSize } from '..';
import { HTMLAttributes, ReactNode } from 'react';
import { Text } from '../../components/Text';
import { KeyOfPalette, KeyOfTypo } from '../../theme';

export type TextTypo = KeyOfTypo | [KeyOfTypo, KeyOfTypo];
export type TextColor = KeyOfPalette | [KeyOfPalette, KeyOfPalette];

export interface ListRowProps extends HTMLAttributes<HTMLDivElement> {
  padding?: PaddingSize;
  text: JSX.Element | string;
  subText?: JSX.Element | string;
  textTypo?: TextTypo;
  textColor?: TextColor;
  leftImage?: ReactNode;
  rightElement?: ReactNode;
  gap?: number;
  imageTextGap?: number;
  fill?: boolean;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * @param padding 패딩
 * number : 상하좌우 패딩
 * [number,number] : 상하, 좌우
 * [number,number,number,number] : 상, 우, 하, 좌
 * @param text : 메인 text
 * @param subtext : 서브 text
 * @param textTypo : text 글자 크기 (기본값 : ['Text_18', 'Text_16'])
 * @param textColor : text 글자 크기 (기본값 : ['gray_500', 'gray_400'])
 * @param leftImage : 왼쪽에 들어갈 element
 * @param rightElement : 오른쪽에 위치시킬 element (기본값 : <></>)
 * @param gap : text와 subtext 사이 gap
 * @param fill : width 100% 필요할때
 * @param as
 * --------------------
 * text와 subText에는 string 또는 <Text/> 컴포넌트가 들어갈 수 있습니다.
 * string으로 넘길때에는 textTypo와 textColor props를 함께 넘겨줍니다.
 * textTypo와 textColor에는 keyof@@ 또는 [keyof@@, keyof@@] 타입을 사용합니다.
 */
export const ListRow = ({
  padding = [16, 24],
  text,
  subText,
  textTypo = ['Text_16', 'Text_14'],
  textColor = ['gray_500', 'gray_400'],
  leftImage,
  rightElement = <></>,
  fill = false,
  gap = 0,
  imageTextGap = 16,
  ...props
}: ListRowProps) => {
  return (
    <Padding size={padding} fill={fill} {...props}>
      <FlexBox id="container" align={'center'} justify={'space-between'}>
        <FlexBox
          id="left"
          align="center"
          justify={'flex-start'}
          gap={imageTextGap}
        >
          {leftImage}
          <FlexBox id="text" direction={'column'} align={'left'} gap={gap}>
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
                  css={{ marginTop: '4px' }}
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
  ...props
}: {
  text: JSX.Element | string;
  typo: KeyOfTypo;
  color: KeyOfPalette;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <>
      {isString(text) ? (
        <Text typo={typo} color={color} {...props}>
          {text}
        </Text>
      ) : (
        <div {...props}>{text}</div>
      )}
    </>
  );
};

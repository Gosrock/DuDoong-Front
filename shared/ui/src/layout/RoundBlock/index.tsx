import { FlexBox, Padding, PaddingSize } from '..';
import { Text } from '../../components/Text';
import { KeyOfPalette, KeyOfTypo, theme } from '../../theme';
import styled from '@emotion/styled';
import { CSSProperties } from '@emotion/serialize';
import { css } from '@emotion/react';

// /**
//  * @paddingSize 패딩
//  * number : 상하좌우 패딩
//  * [number,number] : 상하, 좌우
//  * [number,number,number,number] : 상, 우, 하, 좌
//  * @param text : 메인 text
//  * @param subtext : 서브 text
//  * @param textTypo : text 글자 크기 (기본값 : ['Text_18', 'Text_16'])
//  * @param textColor : text 글자 크기 (기본값 : ['gray_500', 'gray_400'])
//  * @param leftImage : 왼쪽에 들어갈 element
//  * @param rightElement : 오른쪽에 위치시킬 element (기본값 : <></>)
//  * --------------------
//  * text와 subText에는 string 또는 <Text/> 컴포넌트가 들어갈 수 있습니다.
//  * string으로 넘길때에는 textTypo와 textColor props를 함께 넘겨줍니다.
//  * textTypo와 textColor에는 keyof@@ 또는 [keyof@@, keyof@@] 타입을 사용합니다.
//  */

export interface RoundBlockProps {
  content: JSX.Element | string;
  color?: KeyOfPalette;
  paddingSize?: PaddingSize;
  radius?: number;
  textType?: KeyOfTypo;
  textColor?: KeyOfPalette;
}

export const RoundBlock = ({
  content,
  color = 'red_300',
  paddingSize = [4, 12],
  radius = 16,
  textType = 'Text_12',
  textColor = 'black',
}: RoundBlockProps) => {
  return (
    <RoundWrapper radius={radius} colorKey={color}>
      <Padding size={paddingSize}>
        <CustomText content={content} typo={textType} color={textColor} />
      </Padding>
    </RoundWrapper>
  );
};

// ------------------------------------------------------

const CustomText = ({
  content,
  typo,
  color,
}: {
  content: JSX.Element | string;
  typo: KeyOfTypo;
  color: KeyOfPalette;
}) => {
  return (
    <AlignContent>
      {typeof content === 'string' ? (
        <Text typo={typo} color={color}>
          {content}
        </Text>
      ) : (
        <>{content}</>
      )}
    </AlignContent>
  );
};

// ------------------------------------------------------

interface RoundWrapperProps {
  radius: CSSProperties['borderRadius'];
  colorKey: KeyOfPalette;
}

const RoundWrapper = styled.div<RoundWrapperProps>`
  border-radius: ${({ radius }) => `${radius}px`};
  ${({ colorKey, theme }) =>
    colorKey &&
    css`
      background-color: ${theme.palette[colorKey]};
    `};
`;

const AlignContent = styled.div`
  text-align: center;
`;

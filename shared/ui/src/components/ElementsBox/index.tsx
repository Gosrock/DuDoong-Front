import { FlexBox, Padding, PaddingSize } from '../../layout';
import { ReactNode } from 'react';
import { Text } from '../Text';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
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

export type TextTypo = [KeyOfTypo] | [KeyOfTypo, KeyOfTypo];
export type TextColor = [KeyOfPalette] | [KeyOfPalette, KeyOfPalette];

export interface ElementsBoxProps {
  paddingSize: PaddingSize;
  text?: string;
  subtext?: string;
  texttypo?: TextTypo;
  textcolor?: TextColor;
  imageURL?: string;
  rightElement?: ReactNode;
}

export const ElementsBox = ({
  paddingSize,
  text = '',
  subtext = '',
  texttypo = ['Text_18', 'Text_16'],
  textcolor = ['black', 'gray_400'],
  imageURL = '',
  rightElement = <></>,
}: ElementsBoxProps) => {
  return (
    <Padding size={paddingSize}>
      <FlexBox
        align={'center'}
        gap={'unset'}
        justify={'space-between'}
        direction={'row'}
      >
        <LeftElement isImageExist={!!imageURL}>
          <img src={imageURL} />
          <RowList align={'start'} gap={'unset'}>
            <Text typo={texttypo[0]} color={textcolor[0]}>
              {text}
            </Text>
            {!!subtext && texttypo.length != 1 ? (
              <Text typo={texttypo[1]} color={textcolor[1]}>
                {subtext}
              </Text>
            ) : (
              ''
            )}
          </RowList>
        </LeftElement>
        {rightElement}
      </FlexBox>
    </Padding>
  );
};

const LeftElement = styled.div<{
  isImageExist: boolean;
}>`
  display: flex;
  align-items: center;
  flex-direction: row;
  ${({ isImageExist }) =>
    isImageExist
      ? css`
          gap: 16px;
        `
      : ''}

  & > img {
    object-fit: cover;
    max-width: 100px;
    max-height: 100px;
  }
`;

const RowList = styled(FlexBox)``;

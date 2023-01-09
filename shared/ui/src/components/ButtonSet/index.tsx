/** @jsxImportSource @emotion/react */
import { CSSProperties } from '@emotion/serialize';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { FlexBox, flexboxPropsKey, Padding, PaddingSize } from '../../layout';

export interface ButtonSetProps {
  children: ReactNode;
  varient?: ButtonSetVarient;
  padding?: PaddingSize;
}

type ButtonSetVarient =
  | 'mono'
  | 'sub'
  | 'horizontal'
  | 'vertical'
  | 'description';

type buttonSetFlexType = {
  [key in ButtonSetVarient]: {
    [key in flexboxPropsKey]: string;
  };
};

const buttonSetFlex: buttonSetFlexType = {
  mono: { align: 'center', justify: 'center', direction: 'column', gap: '0' },
  sub: {
    align: 'center',
    justify: 'center',
    direction: 'column',
    gap: '20',
  },
  horizontal: {
    align: 'center',
    justify: 'center',
    direction: 'row',
    gap: '10',
  },
  vertical: {
    align: 'center',
    justify: 'center',
    direction: 'column',
    gap: '16',
  },
  description: {
    align: 'left',
    justify: 'center',
    direction: 'column',
    gap: '16',
  },
};

/**
 *
 * @param varient 버튼 셋의 varient
 * 'mono' : 버튼이 하나만 들어감
 * 'sub' : 메인 버튼과 아래쪽에 글자만 있는 서브 버튼이 있음
 * 'horizontal' : 가로로 5:5 두 버튼
 * 'vertical' : 세로로 연달아 두 버튼
 * @paddingSize 버튼 셋의 패딩
 * number : 상하좌우 패딩
 * [number,number] : 상하, 좌우
 * [number,number,number,number] : 상, 우, 하, 좌
 */
export const ButtonSet = ({
  children,
  varient = 'mono',
  padding = [40, 24, 20, 24],
}: ButtonSetProps) => {
  return (
    <Wrapper>
      <Padding size={padding}>
        <FlexBox
          align={buttonSetFlex[varient].align}
          gap={buttonSetFlex[varient].gap}
          justify={buttonSetFlex[varient].justify}
          direction={
            buttonSetFlex[varient].direction as CSSProperties['flexDirection']
          }
        >
          {children}
        </FlexBox>
      </Padding>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${({ theme }) => theme.palette.gradient.linear_white};
`;

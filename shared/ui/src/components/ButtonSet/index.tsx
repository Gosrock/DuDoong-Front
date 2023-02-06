/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { CSSProperties } from '@emotion/serialize';
import styled from '@emotion/styled';
import { HTMLAttributes, ReactNode } from 'react';
import { FlexBox, flexboxPropsKey, Padding, PaddingSize } from '../../layout';
import { media } from '../../theme';

export interface ButtonSetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  varient?: ButtonSetVariantKey;
  padding?: PaddingSize;
  bottomFixed?: boolean;
  noBackground: boolean;
}

type ButtonSetVariantKey =
  | 'mono'
  | 'sub'
  | 'horizontal'
  | 'vertical'
  | 'description';

type buttonSetVariantType = {
  [key in ButtonSetVariantKey]: {
    [key in flexboxPropsKey]: string;
  };
};

const BUTTON_SET_VARIANT: buttonSetVariantType = {
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
 * @noBackground
 */
export const ButtonSet = ({
  children,
  varient = 'mono',
  padding = [40, 24, 20, 24],
  bottomFixed = false,
  noBackground = false,
  ...props
}: ButtonSetProps) => {
  return (
    <Wrapper fixed={bottomFixed} noBackground={noBackground} {...props}>
      <Padding size={padding}>
        <FlexBox
          align={BUTTON_SET_VARIANT[varient].align}
          gap={BUTTON_SET_VARIANT[varient].gap}
          justify={BUTTON_SET_VARIANT[varient].justify}
          direction={
            BUTTON_SET_VARIANT[varient]
              .direction as CSSProperties['flexDirection']
          }
        >
          {children}
        </FlexBox>
      </Padding>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ fixed: boolean; noBackground: boolean }>`
  background: ${({ noBackground, theme }) =>
    noBackground ? 'transparent' : theme.palette.gradient.linear_white};
  ${({ fixed }) =>
    fixed &&
    css`
      position: fixed;
      width: 100%;
      bottom: 0px;

      ${media.pc} {
        max-width: var(--main-width);
      }
    `}
`;

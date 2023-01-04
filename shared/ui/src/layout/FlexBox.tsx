/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { CSSProperties } from '@emotion/serialize';
import { ReactNode } from 'react';

export interface FlexBoxProps {
  align: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  direction?: CSSProperties['flexDirection'];
  gap?: CSSProperties['gap'];
  children: ReactNode;
}

export type flexboxPropsKey = 'align' | 'justify' | 'direction' | 'gap';
/**
 *
 * @param align : align-items 속성 (기본값 : center)
 * @param jusitfy : justify-content 속성 (기본값 : center)
 * @param direction : direction 속성 (기본값 : column)
 * @param gap : gap 속성
 */
export const FlexBox = ({
  align,
  justify = 'center',
  direction = 'row',
  gap = 0,
  children,
}: FlexBoxProps) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: ${align};
        justify-content: ${justify};
        flex-direction: ${direction};
        gap: ${gap}px;
      `}
    >
      {children}
    </div>
  );
};

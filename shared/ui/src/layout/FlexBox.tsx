import { css } from '@emotion/react';
import { CSSProperties } from '@emotion/serialize';
/** @jsxImportSource @emotion/react */

interface FlexBoxProps {
  align: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  direction?: CSSProperties['flexDirection'];
  gap?: CSSProperties['gap'];
  children: JSX.Element | JSX.Element[];
}
/**
 *
 * @param align : align-items 속성 (기본값 : center)
 * @param jusitfy : justify-content 속성 (기본값 : center)
 * @param direction : direction 속성 (기본값 : column)
 * @param gap : gap 속성
 */
export const FlexBox = ({
  align = 'center',
  justify = 'center',
  direction,
  gap,
  children,
}: FlexBoxProps) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: ${align};
        justify-content: ${justify};
        direction: ${direction};
        gap: ${gap}px;
      `}
    >
      {children}
    </div>
  );
};

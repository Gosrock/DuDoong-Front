import { css } from '@emotion/react';
import { KeyOfPalette, theme } from '../../theme';

export const Spacing = ({
  size,
  color,
}: {
  size: number;
  color?: KeyOfPalette;
}) => {
  return (
    <div
      css={css`
        height: ${size}px;
        background-color: ${color ? `${theme.palette[color]}` : 'transperent'};
      `}
    ></div>
  );
};

import { css } from '@emotion/react';
import { KeyOfPalette, theme } from '../../theme';

export const Spacing = ({
  size,
  color = 'white',
}: {
  size: number;
  color?: KeyOfPalette;
}) => {
  return (
    <div
      css={css`
        height: ${size}px;
        background-color: ${theme.palette[color]};
      `}
    ></div>
  );
};

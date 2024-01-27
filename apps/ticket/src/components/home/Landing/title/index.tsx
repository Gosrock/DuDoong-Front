import { css } from '@emotion/react';
import { TitleMobile } from './Title.Mobile';
import { TitlePc } from './Title.PC';
import { palette } from '@dudoong/ui/src/theme/palette';

export const Title = { Mobile: TitleMobile, PC: TitlePc };

export const backgroundBlackStyle = css({ backgroundColor: palette.black });

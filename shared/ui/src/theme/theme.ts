import { Theme } from '@emotion/react';
import { palette } from './palette';
import { typo } from './typo';

export const theme: Theme = {
  palette,
  typo,
};

export type KeyOfPalette = typeof palette;
export type KeyofTheme = keyof typeof theme;
export type KeyOfTypo = typeof typo;

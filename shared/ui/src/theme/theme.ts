import { Theme } from '@emotion/react';
import { palette } from './palette';
import { typo } from './typo';

export const theme: Theme = {
  palette,
  typo,
};

export type TypeOfPalette = typeof palette;
export type KeyOfPalette = keyof typeof palette;

export type KeyofTheme = keyof typeof theme;

export type TypeOfTypo = typeof typo;
export type KeyOfTypo = keyof typeof typo;

export type TextType = {
  typo: KeyOfTypo;
  color: KeyOfPalette;
};

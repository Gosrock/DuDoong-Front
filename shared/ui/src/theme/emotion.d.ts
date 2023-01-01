import '@emotion/react';
import { KeyOfPalette, KeyOfTypo } from './theme';

declare module '@emotion/react' {
  export interface Theme {
    palette: KeyOfPalette;
    typo: KeyOfTypo;
  }
}

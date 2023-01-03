import '@emotion/react';
import { KeyOfPalette, TypeOfTypo } from './theme';

declare module '@emotion/react' {
  export interface Theme {
    palette: KeyOfPalette;
    typo: TypeOfTypo;
  }
}

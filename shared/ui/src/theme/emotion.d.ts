import '@emotion/react';
import { TypeOfPalette, TypeOfTypo } from './theme';

declare module '@emotion/react' {
  export interface Theme {
    palette: TypeOfPalette;
    typo: TypeOfTypo;
  }
}

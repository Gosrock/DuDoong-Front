import { globalStyle } from '@dudoong/ui';
import { Global } from '@emotion/react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Global styles={globalStyle} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

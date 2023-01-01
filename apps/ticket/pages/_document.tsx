import { globalStyle } from '@dudoong/ui';
import { Global } from '@emotion/react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard-dynamic-subset.css"
        />
      </Head>
      <body>
        <Global styles={globalStyle} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

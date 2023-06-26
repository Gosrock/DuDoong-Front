import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <link rel="preconnect" href="https://asset.dudoong.com" /> */}
        <link
          rel="preload"
          as="style"
          href="https://asset.dudoong.com/common/fonts/dudoong-fonts.css"
          crossOrigin="anonymous"
        />
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9c08b495df2ecbc09bd453fb53701551&libraries=services,clusterer"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

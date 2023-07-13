import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <link
          rel="preload"
          as="style"
          href="https://asset.dudoong.com/common/fonts/dudoong-fonts.css"
          crossOrigin="anonymous"
        />
        {/* <link
          rel="stylesheet preload"
          href="https://asset.dudoong.com/common/fonts/dudoong-fonts-swap.css"
          as="style"
        ></link> */}
        <link
          rel="stylesheet preconnect"
          type="text/css"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard-dynamic-subset.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/leetaewook/gmarket-sans-dynamic-subset/GmarketSans.css"
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

import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import { media } from './theme';

export const globalStyle = css`
  ${emotionReset}
  /* 
  @font-face {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    src: url('https://asset.dudoong.com/common/fonts/Pretendard-Bold.subset.woff2')
        format('woff2'),
      url('https://asset.dudoong.com/common/fonts/Pretendard-Bold.subset.woff')
        format('woff');
    font-display: optional;
  }
  @font-face {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    src: url('https://asset.dudoong.com/common/fonts/Pretendard-SemiBold.subset.woff2')
        format('woff2'),
      url('https://asset.dudoong.com/common/fonts/Pretendard-SemiBold.subset.woff')
        format('woff');
    font-display: optional;
  }

  @font-face {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    src: url('https://asset.dudoong.com/common/fonts/Pretendard-Medium.subset.woff2')
        format('woff2'),
      url('https://asset.dudoong.com/common/fonts/Pretendard-Medium.subset.woff')
        format('woff');
    font-display: optional;
  }
  @font-face {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    src: url('https://asset.dudoong.com/common/fonts/Pretendard-Regular.subset.woff2')
        format('woff2'),
      url('https://asset.dudoong.com/common/fonts/Pretendard-Regular.subset.woff')
        format('woff');
    font-display: optional;
  }

  @font-face {
    font-family: 'Gmarket Sans';
    font-weight: 300;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.woff2')
        format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.woff')
        format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.ttf')
        format('truetype');
    font-display: optional;
  }
  @font-face {
    font-family: 'Gmarket Sans';
    font-weight: 500;
    font-style: normal;

    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.woff2')
        format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.woff')
        format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansMedium.ttf')
        format('truetype');
    font-display: optional;
  }
  @font-face {
    font-family: 'Gmarket Sans';
    font-weight: 700;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.woff2')
        format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.woff')
        format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansBold.ttf')
        format('truetype');
    font-display: optional;
  } */

  /* @font-face {
    font-family: 'Gmarket Sans';
    font-weight: 300;
    font-style: normal;
    src: url('https://asset.dudoong.com/common/fonts/GmarketSansLight.woff2')
        format('woff2'),
      url('https://asset.dudoong.com/common/fonts/GmarketSansLight.woff')
        format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: 'Gmarket Sans';
    font-weight: 500;
    font-style: normal;

    src: url('https://asset.dudoong.com/common/fonts/GmarketSansMedium.woff2')
        format('woff2'),
      url('https://asset.dudoong.com/common/fonts/GmarketSansMedium.woff')
        format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: 'Gmarket Sans';
    font-weight: 700;
    font-style: normal;
    src: url('https://asset.dudoong.com/common/fonts/GmarketSansBold.woff2')
        format('woff2'),
      url('https://asset.dudoong.com/common/fonts/GmarketSansBold.woff')
        format('woff');
    font-display: swap;
  } */
  body {
    font-family: 'Pretendard', Pretendard, -apple-system, BlinkMacSystemFont,
      system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', sans-serif !important;
    box-sizing: border-box;

    -webkit-tap-highlight-color: transparent;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    ${media.mobile} {
      -ms-overflow-style: none;
    }
  }
  button {
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
  input:focus {
    outline: none;
  }
  textarea:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    ${media.mobile} {
      display: none;
    }
  }

  /*   ::-webkit-scrollbar-thumb {
    border: solid transparent;
    background-clip: padding-box;
    border-radius: 7px;
    box-shadow: rgb(0 0 0 / 11%) 0px 0px 100px inset;
  }
  :-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar {
    width: 14px;
  } */

  :root {
    --main-width: 600px;
    --toastify-color-info: #9568f6;
    --toastify-color-error: #ff5461;
  }
  .swiper-pagination-bullet {
    background-color: #e3e4e8;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background-color: #bea2fa;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  [data-rsbs-scroll] {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }
`;

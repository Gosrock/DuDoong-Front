/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const withInterceptStdout = require('next-intercept-stdout');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withTM = require('next-transpile-modules')([
  '@dudoong/ui',
  '@dudoong/utils',
  'date-fns',
]);

module.exports = withBundleAnalyzer(
  withInterceptStdout(
    withTM({
      // Any additional config for next goes in here
      swcMinify: true,
      webpack: (config, options) => {
        config.module.rules.push({
          test: /\.svg$/,
          use: [
            options.defaultLoaders.babel,
            {
              loader: '@svgr/webpack',
              options: { babel: false },
            },
          ],
        });
        return config;
      },
      images: {
        // Next 13 이미지 최적화(/_next/image)는 원격 코드 실행 취약점이 있어 끈다. 원본 이미지를 그대로 쓴다 (#375)
        unoptimized: true,
        imageSizes: [32, 64, 128, 256, 384],
        deviceSizes: [750, 1920],
        domains: ['asset.dudoong.com'],
        minimumCacheTTL: 31536000,
      },
      rewrites: async () => [
        {
          source: '/meta/term',
          destination: '/term.html',
        },
        {
          source: '/meta/privacy',
          destination: '/privacy.html',
        },
      ],
    }),
    (text) => (text.includes('Duplicate atom key') ? '' : text),
  ),
);

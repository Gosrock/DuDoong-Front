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
        domains: ['asset.dudoong.com'],
        minimumCacheTTL: 86400,
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

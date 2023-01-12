/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const withInterceptStdout = require('next-intercept-stdout');

const withTM = require('next-transpile-modules')([
  '@dudoong/ui',
  '@dudoong/utils',
  'date-fns',
]);

module.exports = withInterceptStdout(
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
  }),
  (text) => (text.includes('Duplicate atom key') ? '' : text),
);

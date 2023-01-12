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
  }),
  (text) => (text.includes('Duplicate atom key') ? '' : text),
);

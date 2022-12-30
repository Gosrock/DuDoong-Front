/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const withTM = require('next-transpile-modules')(['@gosrock/components']);

module.exports = withTM({
  // Any additional config for next goes in here
  output: 'standalone',
  experimental: {
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
});

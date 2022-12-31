/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const withTM = require('next-transpile-modules')([
  '@dudoong/ui',
  '@dudoong/utils',
]);
module.exports = withTM({
  // Any additional config for next goes in here
});

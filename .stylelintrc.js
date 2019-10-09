const path = require('path');

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
  ],
  rules: {
    'no-duplicate-selectors': null,
    'csstools/value-no-unknown-custom-properties': [true, {
      importFrom: [
        path.resolve(__dirname, 'static-src/styles/breakpoint.css'),
        path.resolve(__dirname, 'static-src/styles/color.css'),
        path.resolve(__dirname, 'static-src/styles/font.css'),
        path.resolve(__dirname, 'static-src/styles/layout.css'),
        path.resolve(__dirname, 'static-src/styles/transition.css'),
        path.resolve(__dirname, 'static-src/styles/z-index.css'),
      ]
    }],
  },
  plugins: [
    'stylelint-value-no-unknown-custom-properties'
  ],
};

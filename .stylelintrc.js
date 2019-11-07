const path = require('path');

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
  ],
  rules: {
    'no-duplicate-selectors': null,
    'selector-nested-pattern': '^&|^@nest',
    'csstools/value-no-unknown-custom-properties': [true, {
      importFrom: [
        path.resolve(__dirname, 'static-src/styles/color.css'),
        path.resolve(__dirname, 'static-src/styles/font.css'),
        path.resolve(__dirname, 'static-src/styles/shadow.css'),
        path.resolve(__dirname, 'static-src/styles/transition.css'),
        path.resolve(__dirname, 'static-src/styles/z-index.css'),
        path.resolve(__dirname, 'static-src/styles/container.module.css'),
      ]
    }],
  },
  plugins: [
    'stylelint-value-no-unknown-custom-properties'
  ],
};

import { useState, useEffect, useMemo } from 'react';
import { createGlobalStyle } from 'styled-components';

const fontFaces = [
  { family: 'Crimson', weight: 400, style: 'normal' },
  { family: 'Crimson', weight: 400, style: 'italic' },
  { family: 'Crimson', weight: 600, style: 'normal' },
  { family: 'Crimson', weight: 600, style: 'italic' },
  { family: 'Crimson', weight: 700, style: 'normal' },
  { family: 'Crimson', weight: 700, style: 'italic' },
  { family: 'Source Sans Pro', weight: 200, style: 'normal' },
  { family: 'Source Sans Pro', weight: 200, style: 'italic' },
  { family: 'Source Sans Pro', weight: 300, style: 'normal' },
  { family: 'Source Sans Pro', weight: 300, style: 'italic' },
  { family: 'Source Sans Pro', weight: 400, style: 'normal' },
  { family: 'Source Sans Pro', weight: 400, style: 'italic' },
  { family: 'Source Sans Pro', weight: 600, style: 'normal' },
  { family: 'Source Sans Pro', weight: 600, style: 'italic' },
  { family: 'Source Sans Pro', weight: 700, style: 'normal' },
  { family: 'Source Sans Pro', weight: 700, style: 'italic' },
  { family: 'Source Sans Pro', weight: 900, style: 'normal' },
  { family: 'Source Sans Pro', weight: 900, style: 'italic' },
  { family: 'Source Serif Pro', weight: 200, style: 'normal' },
  { family: 'Source Serif Pro', weight: 200, style: 'italic' },
  { family: 'Source Serif Pro', weight: 300, style: 'normal' },
  { family: 'Source Serif Pro', weight: 300, style: 'italic' },
  { family: 'Source Serif Pro', weight: 400, style: 'normal' },
  { family: 'Source Serif Pro', weight: 400, style: 'italic' },
  { family: 'Source Serif Pro', weight: 600, style: 'normal' },
  { family: 'Source Serif Pro', weight: 600, style: 'italic' },
  { family: 'Source Serif Pro', weight: 700, style: 'normal' },
  { family: 'Source Serif Pro', weight: 700, style: 'italic' },
  { family: 'Source Serif Pro', weight: 900, style: 'normal' },
  { family: 'Source Serif Pro', weight: 900, style: 'italic' },
];

fontFaces.forEach(
  ({ family, weight, style }) => import(/* webpackMode: "eager" */`./${family}/${weight}-${style}.otf`),
);

export default createGlobalStyle`
  ${fontFaces.reduce((accum, { family, weight, style }) => `
    ${accum}
    @font-face {
      font-family: "${family}";
      font-weight: ${weight};
      font-style: ${style};
      src: url("/wp-content/themes/wmt-custom-theme/static/fonts/${family}/${weight}-${style}.otf");
    }
  `, '')}
`;

import { useState, useEffect } from 'react';
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


/*
* Custom hook that returns a global style component for including
* imported fonts and an indicator value of whether the fonts have
* been loaded.
*/

export default function useFonts() {
  const [fontFacesSrc, setFontFacesSrc] = useState([]);
  useEffect(() => {
    Promise.all(
      fontFaces.map(
        ({ family, weight, style }) => import(`./${family}/${weight}-${style}.otf`),
      ),
    ).then(
      (importedModules) => setFontFacesSrc(importedModules.map(
        (importedModule) => importedModule.default,
      )),
    );
  }, []);

  const Fonts = createGlobalStyle`
    ${fontFacesSrc.reduce((accum, fontFaceSrc, index) => `
      ${accum}
      @font-face {
        font-family: ${fontFaces[index].family};
        font-weight: ${fontFaces[index].weight};
        font-style: ${fontFaces[index].style};
        src: url(${fontFaceSrc});
      }
    `, '')}
  `;

  return [Fonts, !!fontFacesSrc.length];
}

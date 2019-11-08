import React from 'react';
import { useLocation } from 'react-router-dom';

import PrintSection from './PrintSection';
import PrintFigure from './PrintFigure';
import PrintBlock from './PrintBlock';
import { parseHash, REFERABLE_CONTENT_TYPES } from '../constants';


/*
* Custom hook that returns a print-ready version of the content item
* specified by the hash.
*/

export default function usePrintContent(contentReady, { path: sectionPath }) {
  const { pathname, hash } = useLocation();
  const [contentType, contentNumber] = parseHash(hash);
  if (sectionPath === pathname && contentReady) {
    switch (contentType) {
      case REFERABLE_CONTENT_TYPES.figure: {
        return <PrintFigure number={contentNumber} />;
      }

      case REFERABLE_CONTENT_TYPES.block: {
        return <PrintBlock number={contentNumber} />;
      }

      default:
        return <PrintSection />;
    }
  }

  return null;
}

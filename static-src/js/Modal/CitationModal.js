import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import SectionContext from '../SectionContext';

export default function CitationModalForeground() {
  const { contentType, contentNumber } = useSelector((state) => state.modalContent);
  const { slug: sectionSlug } = useContext(SectionContext);

  return (
    <>
      <div>sectionSlug: {sectionSlug}</div>
      <div>contentType: {contentType}</div>
      <div>contentNumber: {contentNumber}</div>
    </>
  );
}

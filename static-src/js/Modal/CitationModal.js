import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import CurrentSectionContext from '../CurrentSectionContext';

export default function CitationModalForeground() {
  const { contentType, contentNumber } = useSelector((state) => state.modalContent);
  const { slug: sectionSlug } = useContext(CurrentSectionContext);

  return (
    <>
      <div>sectionSlug: {sectionSlug}</div>
      <div>contentType: {contentType}</div>
      <div>contentNumber: {contentNumber}</div>
    </>
  );
}

import React, { useContext } from 'react';

import { EXPANDED_TOC, REFERABLE_CONTENT_TYPES } from '../constants';
import Block from './Block';
import MarginLinks from '../MarginLinks';
import SectionContext from '../SectionContext';


export default function TitleBlock() {
  const {
    title,
    author,
    slug,
    downloadUrl,
    contentRefs: { titleRef },
  } = useContext(SectionContext);

  return (
    <MarginLinks
      contentType={REFERABLE_CONTENT_TYPES.section}
      downloadUrl={downloadUrl}
    >
      <Block
        ref={titleRef}
        title={title}
        author={author}
        isToc={slug === EXPANDED_TOC.slug}
      />
    </MarginLinks>
  );
}

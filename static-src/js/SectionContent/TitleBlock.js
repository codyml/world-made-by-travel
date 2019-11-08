import React, { useContext } from 'react';

import { REFERABLE_CONTENT_TYPES } from '../constants';
import Block from './Block';
import MarginLinks from '../MarginLinks';
import SectionContext from '../SectionContext';


export default function TitleBlock() {
  const {
    numeral,
    title,
    author,
    isToc,
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
        title={`${numeral ? `${numeral}. ` : ''}${title}`}
        author={author}
        isToc={isToc}
      />
    </MarginLinks>
  );
}

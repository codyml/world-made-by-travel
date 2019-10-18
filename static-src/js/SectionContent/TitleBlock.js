import React, { useContext } from 'react';

import { EXPANDED_TOC, REFERABLE_CONTENT_TYPES } from '../constants';
import Block from './Block';
import { MarginLinks } from './MarginLinks';
import CurrentSectionContext from '../CurrentSectionContext';


const TitleBlock = React.forwardRef((props, ref) => {
  const { title, author, slug } = useContext(CurrentSectionContext);

  return (
    <MarginLinks contentType={REFERABLE_CONTENT_TYPES.section}>
      <Block
        ref={ref}
        title={title}
        author={author}
        isToc={slug === EXPANDED_TOC.slug}
      />
    </MarginLinks>
  );
});

TitleBlock.displayName = 'TitleBlock';

export default TitleBlock;

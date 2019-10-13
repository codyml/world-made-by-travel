import React, { useContext } from 'react';

import { EXPANDED_TOC } from '../constants';
import Block from './Block';
import CurrentSectionContext from '../CurrentSectionContext';


const TitleBlock = React.forwardRef((props, ref) => {
  const { title, author, slug } = useContext(CurrentSectionContext);

  return (
    <Block
      ref={ref}
      title={title}
      author={author}
      isToc={slug === EXPANDED_TOC.slug}
    />
  );
});

export default TitleBlock;

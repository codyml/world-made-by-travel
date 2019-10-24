import React, { useContext } from 'react';

import Block from './Block';
import { useMarginLinks } from './MarginLinks';
import useContentRefs from './useContentRefs';
import { Content } from '../markdown';
import CurrentSectionContext from '../CurrentSectionContext';
import { REFERABLE_CONTENT_TYPES } from '../constants';


export default function MainContentBlock() {
  const { mainContent: { contentNodes } } = useContext(CurrentSectionContext);

  const marginLinksExtension = useMarginLinks();
  const paragraphRefsExtension = useContentRefs(REFERABLE_CONTENT_TYPES.paragraph);
  const figureRefsExtension = useContentRefs(REFERABLE_CONTENT_TYPES.figure);
  const footnoteLinkRefsExtension = useContentRefs(REFERABLE_CONTENT_TYPES.footnoteLink);

  return (
    <Block>
      <Content
        nodes={contentNodes}
        extensions={[
          marginLinksExtension,
          paragraphRefsExtension,
          figureRefsExtension,
          footnoteLinkRefsExtension,
        ]}
      />
    </Block>
  );
}

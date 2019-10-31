import React, { useContext } from 'react';

import Block from './Block';
import { useMarginLinks } from './MarginLinks';
import useContentRefs from './useContentRefs';
import { Content, PARAGRAPH_TAG, Figure, FootnoteLink } from '../markdown';
import CurrentSectionContext from '../CurrentSectionContext';


const IMAGE_TAG = 'img';

/*
* Renders the main content block of the section.
*/

export default function MainContentBlock() {
  const {
    mainContent: { contentNodes },
    contentRefs: { paragraphRefs, figureRefs, footnoteLinkRefs, imageRefs },
  } = useContext(CurrentSectionContext);

  const marginLinksExtension = useMarginLinks();
  const paragraphRefsExtension = useContentRefs(PARAGRAPH_TAG, paragraphRefs);
  const figureRefsExtension = useContentRefs(Figure, figureRefs);
  const footnoteLinkRefsExtension = useContentRefs(FootnoteLink, footnoteLinkRefs);
  const imageRefsExtension = useContentRefs(IMAGE_TAG, imageRefs);

  return (
    <Block>
      <Content
        nodes={contentNodes}
        extensions={[
          marginLinksExtension,
          paragraphRefsExtension,
          figureRefsExtension,
          footnoteLinkRefsExtension,
          imageRefsExtension,
        ]}
      />
    </Block>
  );
}

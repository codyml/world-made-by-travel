import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Block from './Block';
import { useMarginLinks } from './MarginLinks';
import useContentRefs from './useContentRefs';
import { Content } from '../markdown';
import CurrentSectionContext from '../CurrentSectionContext';
import { REFERABLE_CONTENT_TYPES } from '../constants';


export default function MainContentBlock({ paragraphRefs, figureRefs, footnoteLinkRefs }) {
  const {
    mainContent: { contentNodes },
  } = useContext(CurrentSectionContext);

  const marginLinksExtension = useMarginLinks();
  const paragraphRefsExtension = useContentRefs(paragraphRefs, REFERABLE_CONTENT_TYPES.paragraph);
  const figureRefsExtension = useContentRefs(figureRefs, REFERABLE_CONTENT_TYPES.figure);
  const footnoteLinkRefsExtension = useContentRefs(
    footnoteLinkRefs,
    REFERABLE_CONTENT_TYPES.footnoteLink,
  );

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

MainContentBlock.propTypes = {
  paragraphRefs: PropTypes.objectOf(PropTypes.object).isRequired,
  figureRefs: PropTypes.objectOf(PropTypes.object).isRequired,
  footnoteLinkRefs: PropTypes.objectOf(PropTypes.object).isRequired,
};

import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Block from './Block';
import { useMarginLinks } from './MarginLinks';
import useContentRefs from './useContentRefs';
import { Content } from '../markdown';
import CurrentSectionContext from '../CurrentSectionContext';
import { REFERABLE_CONTENT_TYPES } from '../constants';

export default function FootnotesBlock({ footnoteRefs }) {
  const marginLinksExtension = useMarginLinks();
  const footnoteRefsExtension = useContentRefs(footnoteRefs, REFERABLE_CONTENT_TYPES.footnote);
  const { mainContent: { footnotesByNumber } } = useContext(CurrentSectionContext);
  const footnotes = Object.values(footnotesByNumber);
  if (!footnotes.length) {
    return null;
  }

  footnotes.sort((a, b) => a - b);

  return (
    <Block title="Footnotes">
      <Content nodes={footnotes} extensions={[marginLinksExtension, footnoteRefsExtension]} />
    </Block>
  );
}

FootnotesBlock.propTypes = {
  footnoteRefs: PropTypes.objectOf(PropTypes.object).isRequired,
};

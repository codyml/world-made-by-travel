import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import MarkdownContent from '../MarkdownContent';
import Block from './Block';

export default function MainContentBlock({ slug: sectionSlug }) {
  const { markdown } = useSelector((state) => state.sectionContentBySlug[sectionSlug]);

  return (
    <Block>
      <MarkdownContent>
        {markdown}
      </MarkdownContent>
    </Block>
  );
}

MainContentBlock.propTypes = {
  slug: PropTypes.string.isRequired,
};

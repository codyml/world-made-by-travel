import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Block from './Block';
import MarginLinks from '../MarginLinks';
import { Content } from '../markdown';
import SectionContext from '../SectionContext';
import { REFERABLE_CONTENT_TYPES } from '../constants';

export default function CustomBlock({ blockNumber }) {
  const { blocks, contentRefs: { blockRefs } } = useContext(SectionContext);
  const {
    title,
    author,
    download,
    contentNodes,
  } = blocks.filter((block) => block.number === blockNumber)[0];

  const blockRef = blockRefs.current[blockNumber];

  return (
    <MarginLinks
      contentType={REFERABLE_CONTENT_TYPES.block}
      downloadAllowed={!!download}
    >
      <Block ref={blockRef} title={title} author={author}>
        <Content nodes={contentNodes} />
      </Block>
    </MarginLinks>
  );
}

CustomBlock.propTypes = {
  blockNumber: PropTypes.number.isRequired,
};

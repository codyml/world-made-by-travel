import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import SectionContext from '../SectionContext';
import { Block } from '../SectionContent';
import { Content } from '../markdown';


export default function PrintBlock({ number }) {
  const { blocks } = useContext(SectionContext);
  const block = blocks.filter((thisBlock) => thisBlock.number === number)[0];
  if (!block) {
    return null;
  }

  const { title, author, contentNodes } = block;
  return (
    <Block title={title} author={author} print>
      <Content nodes={contentNodes} />
    </Block>
  );
}

PrintBlock.propTypes = {
  number: PropTypes.number.isRequired,
};

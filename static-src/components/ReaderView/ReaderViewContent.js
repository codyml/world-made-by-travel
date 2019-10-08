import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import useSetTitle from '../useSetTitle';
import { EXPANDED_TOC } from '../../constants';


/*
* This component renders a reader view "page" of the book.
*/

export default function ReaderViewContent({ contentSlug, isActive, ...props }) {
  const sectionMetaBySlug = useSelector((state) => ({
    [EXPANDED_TOC.slug]: EXPANDED_TOC,
    ...state.sectionMetaBySlug,
  }));

  useSetTitle([sectionMetaBySlug[contentSlug].title], isActive);

  return (
    <div {...props}>
      Section Content:
      {' '}
      {contentSlug}
    </div>
  );
}

ReaderViewContent.propTypes = {
  contentSlug: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

ReaderViewContent.defaultProps = {
  isActive: false,
};

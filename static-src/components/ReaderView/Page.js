import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TableOfContents from '../TableOfContents';
import useSetTitle from '../useSetTitle';
import { EXPANDED_TOC } from '../../constants';


/*
* This component renders a reader view "page" of the book.
*/

export default function Page({ contentSlug, isActive, ...props }) {
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
      {contentSlug === EXPANDED_TOC.slug ? <TableOfContents /> : null}
    </div>
  );
}

Page.propTypes = {
  contentSlug: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

Page.defaultProps = {
  isActive: false,
};

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import useSetTitle from './useSetTitle';
import TableOfContents from './TableOfContents';
import { EXPANDED_TOC } from '../constants';

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
    <StyledReaderViewContent {...props}>
      Section Content:
      {' '}
      {contentSlug}
      {contentSlug ? (
        <>
          <br />
          <Link to="/">Link to /</Link>
          <br />
          <Link to="/toc">Link to /toc</Link>
          <br />
          <Link to="/preface-and-acknowledgments">Link to /preface-and-acknowledgments</Link>
          <br />
          <Link to="/doesnt-exist">Link to /doesnt-exist</Link>
          <br />
          <Link to="/scholars-essays">Link to /scholars-essays</Link>
          <br />
          <Link to="/scholars-essays/sweet-who-traveled">Link to /scholars-essays/sweet-who-traveled</Link>
          <br />
          <Link to="/scholars-essays/doesnt-exist">Link to /scholars-essays/doesnt-exist</Link>
        </>
      ) : <TableOfContents />}
    </StyledReaderViewContent>
  );
}

ReaderViewContent.propTypes = {
  contentSlug: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

ReaderViewContent.defaultProps = {
  isActive: false,
};

const StyledReaderViewContent = styled.div`
  background-color: #ddd;
  padding: 3em 0;
`;

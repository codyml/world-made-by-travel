import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import useSetTitle from './useSetTitle';
import TableOfContents from './TableOfContents';

/*
* This component renders a reader view "page" of the book.
*/

export default function SectionContent({ sectionSlug, isTableOfContents, isActive }) {
  const sectionMetaBySlug = useSelector((state) => state.sectionMetaBySlug);
  useSetTitle(
    isTableOfContents ? ['Table of Contents'] : [sectionMetaBySlug[sectionSlug].title],
    isActive,
  );

  return (
    <StyledSectionContent>
      Section Content:
      {' '}
      { isTableOfContents ? 'table of contents' : sectionSlug }
      { isTableOfContents ? <TableOfContents /> : null }
    </StyledSectionContent>
  );
}

SectionContent.propTypes = {
  sectionSlug: PropTypes.string,
  isTableOfContents: PropTypes.bool,
  isActive: PropTypes.bool,
};

SectionContent.defaultProps = {
  sectionSlug: null,
  isTableOfContents: false,
  isActive: false,
};

const StyledSectionContent = styled.div`
  background-color: #ffd;
`;

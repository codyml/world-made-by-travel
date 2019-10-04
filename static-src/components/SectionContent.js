import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/*
* This component renders a reader view "page" of the book.
*/

export default function SectionContent({ slug }) {
  return (
    <StyledSectionContent>
      Section Content:
      { slug }
    </StyledSectionContent>
  );
}

SectionContent.propTypes = {
  slug: PropTypes.string.isRequired,
};

const StyledSectionContent = styled.div`
  background-color: #ffd;
`;

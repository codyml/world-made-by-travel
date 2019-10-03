import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import styled from 'styled-components';

export default function Book({
  content,
  bookPosition,
  explorerOpen,
  setExplorerOpen,
  setExplorerUrl,
  openModal,
}) {
  return (
    <StyledBook>
      <Router>

        <div>Book</div>
        <div>
          Number of TOC items:
          {content.length}
        </div>
        <button type="button" onClick={() => setExplorerOpen(!explorerOpen)}>Toggle Explorer</button>
        <button type="button" onClick={() => setExplorerUrl('/#/entries/115')}>Set Explorer to /#/entries/115</button>
        <button type="button" onClick={() => openModal('Modal contents!')}>Open Modal</button>
      </Router>
    </StyledBook>
  );
}

Book.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  bookPosition: PropTypes.shape({
    sectionGroup: PropTypes.string,
    section: propTypes.string.isRequired,
    scrollPosition: propTypes.number.isRequired,
  }),
  explorerOpen: PropTypes.bool.isRequired,
  setExplorerOpen: PropTypes.func.isRequired,
  setExplorerUrl: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

Book.defaultProps = {
  bookPosition: null,
};

const StyledBook = styled.div`
  flex-grow: 1;
`;

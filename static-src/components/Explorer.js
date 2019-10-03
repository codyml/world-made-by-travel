import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function Explorer({ isOpen, url, setUrl }) {
  return (
    <StyledExplorer isOpen={isOpen}>
      <div>{ isOpen ? 'open' : 'closed' }</div>
      <div>{ url }</div>
      <button type="button" onClick={() => setUrl('/#/entries/114')}>Set URL to /#/entries/114</button>
    </StyledExplorer>
  );
}

Explorer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
};

const StyledExplorer = styled.div`
  width: 100%;
  height: 0%;
  background-color: #fdf;
  transition: height 0.25s;
  ${({ isOpen }) => (isOpen ? `
    height: 50%;
  ` : null)}
`;

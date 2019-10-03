import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function Modal({ content, close }) {
  return (
    <StyledModal isOpen={content}>
      <div>
        content:
        {content}
      </div>
      <button type="button" onClick={close}>Close Modal</button>
    </StyledModal>
  );
}

Modal.propTypes = {
  content: PropTypes.node,
  close: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  content: null,
};

const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffd;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0s 0.15s;
  ${({ isOpen }) => (isOpen ? `
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s, visibility 0s;
  ` : null)}
`;

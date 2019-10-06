import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


/*
* Renders an HTML string.
*/

export default function HTMLContent({ children, ...props }) {
  return (
    <StyledHTMLContent {...props} dangerouslySetInnerHTML={{ __html: children }} />
  );
}

HTMLContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
};

HTMLContent.defaultProps = {
  className: '',
  children: '',
};

const StyledHTMLContent = styled.div`
  & > p:first-child {
    margin-top: 0;
  }

  & > p:last-child {
    margin-bottom: 0;
  }
`;

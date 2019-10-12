import React from 'react';
import PropTypes from 'prop-types';


/*
* Renders an HTML string.
*/

export default function HTMLContent({ children, ...props }) {
  //  eslint-disable-next-line react/no-danger
  return <div {...props} dangerouslySetInnerHTML={{ __html: children }} />;
}

HTMLContent.propTypes = {
  children: PropTypes.string,
};

HTMLContent.defaultProps = {
  children: '',
};

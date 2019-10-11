import React from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';

import style from 'styles/HTMLContent.module.css';


/*
* Renders an HTML string.
*/

export default function HTMLContent({ className, children, ...props }) {
  return (
    <div
      className={c(className, style.HTMLContent)}
      //  eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: children }}
      {...props}
    />
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

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from '../styles/HTMLContent.module.css';


/*
* Renders an HTML string.
*/

export default function HTMLContent({ className, children, ...props }) {
  return (
    <div
      className={classNames(className, styles.HTMLContent)}
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

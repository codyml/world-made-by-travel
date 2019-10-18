import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/figures.module.css';

export default function Figure({ children }) {
  return (
    <figure className={style.Figure}>
      {children}
    </figure>
  );
}

Figure.propTypes = {
  children: PropTypes.node.isRequired,
};

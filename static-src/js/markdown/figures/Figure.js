import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/figures.module.css';
import { CONTENT_TYPE_HASH, REFERABLE_CONTENT_TYPES } from '../../constants';

export default function Figure({ figureNumber, children }) {
  const hash = CONTENT_TYPE_HASH[REFERABLE_CONTENT_TYPES.figure].generate(figureNumber);

  return (
    <figure className={style.Figure} id={hash}>
      {children}
    </figure>
  );
}

Figure.propTypes = {
  figureNumber: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

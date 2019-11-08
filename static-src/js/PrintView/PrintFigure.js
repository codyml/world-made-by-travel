import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import SectionContext from '../SectionContext';
import { Block } from '../SectionContent';
import { Content } from '../markdown';


export default function PrintFigure({ number }) {
  const { mainContent: { figuresByNumber } } = useContext(SectionContext);
  const figure = figuresByNumber[number];
  if (!figure) {
    return null;
  }

  return (
    <Block title={`Figure ${number}`} print>
      <Content nodes={[figure]} />
    </Block>
  );
}

PrintFigure.propTypes = {
  number: PropTypes.number.isRequired,
};

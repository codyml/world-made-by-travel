import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { Content } from '../markdown';
import CurrentSectionContext from '../CurrentSectionContext';


export const FigureModalBackground = () => {
  const { figureContentIdentifier } = useSelector((state) => state.modalContent);
  const { figureContentByIdentifier } = useContext(CurrentSectionContext);
  const figureContentNodes = figureContentByIdentifier[figureContentIdentifier].contentNodes;

  return <Content nodes={figureContentNodes} />;
};

export const FigureModalForeground = () => {
  const { captionNumber } = useSelector((state) => state.modalContent);
  const { mainContent: { figureCaptionsByNumber } } = useContext(CurrentSectionContext);
  const captionContentNodes = figureCaptionsByNumber[captionNumber].children;

  return <Content nodes={captionContentNodes} />;
};

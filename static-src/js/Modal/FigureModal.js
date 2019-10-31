import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import style from 'styles/Modal.module.css';
import { Content } from '../markdown';
import CurrentSectionContext from '../CurrentSectionContext';


export function FigureModalBackground() {
  const { figureContentIdentifier } = useSelector((state) => state.modalContent);
  const { figureContentByIdentifier } = useContext(CurrentSectionContext);
  const figureContentNodes = figureContentByIdentifier[figureContentIdentifier].contentNodes;

  return (
    <div className={style.figureContent}>
      <Content nodes={figureContentNodes} />
    </div>
  );
}

export function FigureModalForeground() {
  const { captionNumber } = useSelector((state) => state.modalContent);
  const { mainContent: { figureCaptionsByNumber } } = useContext(CurrentSectionContext);
  const captionContentNodes = figureCaptionsByNumber[captionNumber].children;

  return <Content nodes={captionContentNodes} />;
}

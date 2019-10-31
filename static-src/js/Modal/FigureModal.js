import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import style from 'styles/Modal.module.css';
import { Content } from '../markdown';
import SectionContext from '../SectionContext';


export function FigureModalBackground() {
  const { figureContentIdentifier } = useSelector((state) => state.modalContent);
  const { figureContentByIdentifier } = useContext(SectionContext);
  const figureContentNodes = figureContentByIdentifier[figureContentIdentifier].contentNodes;

  return (
    <figure className={style.figureContent}>
      <Content nodes={figureContentNodes} />
    </figure>
  );
}

export function FigureModalForeground() {
  const { captionNumber } = useSelector((state) => state.modalContent);
  const { mainContent: { figureCaptionsByNumber } } = useContext(SectionContext);
  const captionContentNodes = figureCaptionsByNumber[captionNumber].children;

  return (
    <figcaption className={style.figureCaption}>
      <Content nodes={captionContentNodes} />
    </figcaption>
  );
}

import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import classNamesBind from 'classnames/bind';

import style from 'styles/Modal.module.css';
import { Content } from '../markdown';
import SectionContext from '../SectionContext';


const cx = classNamesBind.bind(style);

export function FigureModalBackground() {
  const { figureContentIdentifier } = useSelector((state) => state.modalContent);
  const { figureContentByIdentifier } = useContext(SectionContext);
  const figureContentNodes = figureContentByIdentifier[figureContentIdentifier].contentNodes;
  const isImage = figureContentNodes[0].component === 'img';

  return (
    <div className={cx(style.figureContent, { isImage })}>
      <Content nodes={figureContentNodes} />
    </div>
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

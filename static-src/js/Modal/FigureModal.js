import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import classNamesBind from 'classnames/bind';

import style from 'styles/Modal.module.css';
import marginLinksStyle from 'styles/MarginLinks.module.css';
import { Content } from '../markdown';
import SectionContext from '../SectionContext';
import { REFERABLE_CONTENT_TYPES } from '../constants';
import MarginLinks from '../MarginLinks';


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
  const {
    figureNumber,
    figureContentIdentifier,
    captionNumber,
  } = useSelector((state) => state.modalContent);

  const {
    mainContent: { figureCaptionsByNumber },
    figureContentByIdentifier,
  } = useContext(SectionContext);

  const captionContentNodes = figureCaptionsByNumber[captionNumber].children;
  const figureContentDownloadLink = figureContentByIdentifier[figureContentIdentifier].downloadLink;

  return (
    <MarginLinks
      contentType={REFERABLE_CONTENT_TYPES.figure}
      contentNumber={figureNumber}
      downloadLink={figureContentDownloadLink}
      className={marginLinksStyle.figureModal}
    >
      <figcaption className={style.figureCaption}>
        <Content nodes={captionContentNodes} />
      </figcaption>
    </MarginLinks>
  );
}

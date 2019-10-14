import React from 'react';
import { useSelector } from 'react-redux';

import { useSectionContent } from '../SectionContent';
import { ContentNode, useLinks, CAPTION_TAG } from '../markdown';
import CurrentSectionContext from '../CurrentSectionContext';


export const FigureModalBackground = () => {
  const { sectionSlug, figureContentIdentifier } = useSelector((state) => state.modalContent);
  const [, { figureContentByIdentifier }] = useSectionContent(sectionSlug);
  const figureContentNodes = figureContentByIdentifier[figureContentIdentifier].contentNodes;

  return <ContentNode>{figureContentNodes}</ContentNode>;
};

export const FigureModalForeground = () => {
  const { sectionSlug, captionNumber } = useSelector((state) => state.modalContent);
  const [, currentSectionContext] = useSectionContent(sectionSlug);
  const { mainContent: { references } } = currentSectionContext;
  const captionContentNodes = references[CAPTION_TAG].refsByNumber[captionNumber].children;
  const linksExtension = useLinks();

  return (
    <CurrentSectionContext.Provider value={currentSectionContext}>
      <ContentNode extensions={[linksExtension]}>{captionContentNodes}</ContentNode>
    </CurrentSectionContext.Provider>
  );
};

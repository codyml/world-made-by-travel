import React from 'react';
import { useSelector } from 'react-redux';

import { ContentNode, useLinks } from '../markdown';


export const FigureModalBackground = () => {
  const { figureContent } = useSelector((state) => state.modalContent);
  const linksExtension = useLinks();

  return <ContentNode extensions={[linksExtension]}>{figureContent}</ContentNode>;
};

export const FigureModalForeground = () => {
  const { captionContent } = useSelector((state) => state.modalContent);
  const linksExtension = useLinks();

  return <ContentNode extensions={[linksExtension]}>{captionContent}</ContentNode>;
};

import { useState, useCallback } from 'react';

export default function useHoverTitle({ contentAreaRef, titleRef, hoverTitleRef }) {
  const [hoverTitleVisible, setHoverTitleVisible] = useState();

  //  Recalculates scroll reducers.
  const hoverTitleScrollHandler = useCallback((event) => {
    if (event.target === contentAreaRef.current) {
      const { target: section } = event;
      const { current: title } = titleRef;
      const { current: hoverTitle } = hoverTitleRef;

      setHoverTitleVisible(
        title.offsetTop + title.offsetHeight - section.scrollTop
          < hoverTitle.offsetTop + hoverTitle.offsetHeight,
      );
    }
  }, [contentAreaRef, hoverTitleRef, titleRef]);

  return [
    hoverTitleScrollHandler,
    hoverTitleVisible,
  ];
}

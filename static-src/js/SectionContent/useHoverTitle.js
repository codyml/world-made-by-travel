import { useRef, useState, useCallback } from 'react';

export default function useHoverTitle(contentAreaRef) {
  const titleRef = useRef();
  const hoverTitleRef = useRef();
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
  }, [contentAreaRef]);

  return [
    hoverTitleScrollHandler,
    titleRef,
    hoverTitleRef,
    hoverTitleVisible,
  ];
}

import { useState, useCallback, useEffect } from 'react';

export default function useHoverTitle({
  contentRefs: { contentAreaRef, titleRef, hoverTitleRef },
}) {
  const [hoverTitleVisible, setHoverTitleVisible] = useState();

  const onScroll = useCallback((event) => {
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

  useEffect(() => {
    const element = contentAreaRef.current;
    element.addEventListener('scroll', onScroll);
    return () => element.removeEventListener('scroll', onScroll);
  }, [contentAreaRef, onScroll]);

  return hoverTitleVisible;
}

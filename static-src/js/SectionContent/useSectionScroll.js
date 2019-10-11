import { useRef, useState, useCallback } from 'react';

export default function useSectionScroll() {
  const titleRef = useRef();
  const hoverTitleRef = useRef();
  const [hoverTitleVisible, setHoverTitleVisible] = useState();

  //  Recalculates scroll reducers.
  const scrollHandler = useCallback((event) => {
    const { target: section } = event;
    const { current: title } = titleRef;
    const { current: hoverTitle } = hoverTitleRef;

    setHoverTitleVisible(
      title.offsetTop + title.offsetHeight - section.scrollTop
        < hoverTitle.offsetTop + hoverTitle.offsetHeight,
    );
  }, []);

  return [scrollHandler, { titleRef, hoverTitleRef }, { hoverTitleVisible }];
}

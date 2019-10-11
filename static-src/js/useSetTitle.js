import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

/*
* Custom hook that sets the title to the value the hook was called
* with.
*/

export default function useSetTitle(titleElements, isActive) {
  const { coverTitle } = useSelector((state) => state.config);
  const match = useRouteMatch('/');
  useEffect(() => {
    if (match.isExact) {
      document.title = coverTitle;
    } else if (isActive) {
      document.title = [
        ...titleElements,
        coverTitle,
      ].join(' | ');
    }
  }, [coverTitle, match, titleElements, isActive]);
}

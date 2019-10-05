import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

/*
* Custom hook that sets the title to the value the hook was called
* with.
*/

const bookTitle = 'A World Made By Travel';
export default function useSetTitle(titleElements, isActive) {
  const match = useRouteMatch('/');
  useEffect(() => {
    if (match.isExact) {
      document.title = bookTitle;
    } else if (isActive) {
      document.title = [
        ...titleElements,
        bookTitle,
      ].join(' | ');
    }
  }, [match, titleElements, isActive]);
}

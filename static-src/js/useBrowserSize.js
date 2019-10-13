import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { breakpoints } from 'styles/env.babel';
import { SET_BROWSER_SIZE } from './constants';

export default function useBrowserSize() {
  const browserSize = useSelector((state) => state.browserSize);
  const dispatch = useDispatch();

  //  Updates context on browser size change.
  useEffect(() => {
    const handleResizeChange = () => {
      const width = window.innerWidth;
      let newBrowserSize = 'desktop';
      if (width < breakpoints['--breakpoint-tablet']) {
        newBrowserSize = 'mobile';
      } else if (width < breakpoints['--breakpoint-desktop']) {
        newBrowserSize = 'tablet';
      }

      if (newBrowserSize !== browserSize) {
        dispatch({ type: SET_BROWSER_SIZE, browserSize: newBrowserSize });
      }
    };

    window.addEventListener('resize', handleResizeChange);
    handleResizeChange();
    return () => window.removeEventListener('resize', handleResizeChange);
  }, [browserSize, dispatch]);
}

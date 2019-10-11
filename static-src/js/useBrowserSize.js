import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import style from 'styles/useBrowserSize.module.css';
import { SET_BROWSER_SIZE } from './constants';

export default function useBrowserSize() {
  const { current: breakpoints } = useRef({});
  const browserSize = useSelector((state) => state.browserSize);
  const dispatch = useDispatch();

  //  Workaround to get CSS-defined breakpoints in JS
  useEffect(() => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    Object.entries(style).forEach(([size, className]) => {
      element.className = className;
      breakpoints[size] = +getComputedStyle(element).width.slice(0, -2);
    });
    element.remove();
  }, [breakpoints]);

  //  Updates context on browser size change.
  useEffect(() => {
    const handleResizeChange = () => {
      const width = window.innerWidth;
      let newBrowserSize = 'desktop';
      if (width < breakpoints.tablet) {
        newBrowserSize = 'mobile';
      } else if (width < breakpoints.desktop) {
        newBrowserSize = 'tablet';
      }

      if (newBrowserSize !== browserSize) {
        dispatch({ type: SET_BROWSER_SIZE, browserSize: newBrowserSize });
      }
    };

    window.addEventListener('resize', handleResizeChange);
    handleResizeChange();
    return () => window.removeEventListener('resize', handleResizeChange);
  }, [breakpoints.tablet, breakpoints.desktop, browserSize, dispatch]);
}

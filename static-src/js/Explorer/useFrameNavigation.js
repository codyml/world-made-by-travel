import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SET_EXPLORER_PATH } from '../constants';


/*
* Custom hook that detects location changes inside the frame and
* updates Redux accordingly, detects Redux changes and updates frame
* location accordingly, and links the forward/back buttons to the
* frame's document history.
*/

export default function useFrameNavigation() {
  const frameRef = useRef();
  const explorerBaseUrl = useSelector((state) => state.config.explorerBaseUrl);
  const explorerPath = useSelector((state) => state.explorerPath);
  const [{
    backPath,
    currentPath,
    forwardPath,
  }, setFrameNavState] = useState({ currentPath: explorerPath });

  const dispatch = useDispatch();

  //  Updates Redux state when frame sends location update.
  useEffect(() => {
    const handleMessage = (event) => {
      //  Only accept messages from explorerBaseUrl with a navState property
      if (explorerBaseUrl.startsWith(event.origin) && event.data.navState) {
        console.log('message received:', event);
        try {
          const { back, current, forward } = event.data.navState;

          //  Save nav state update
          setFrameNavState({
            backPath: back,
            currentPath: current,
            forwardPath: forward,
          });

          //  Update Redux state
          if (current !== explorerPath) {
            dispatch({ type: SET_EXPLORER_PATH, explorerPath: current });
          }
        } catch (e) { console.error(e); } // eslint-disable-line no-console
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [dispatch, explorerBaseUrl, explorerPath]);

  //  Updates frame location when Redux state changes
  useEffect(() => {
    if (currentPath !== explorerPath) {
      console.log('redux location changed, updating frame location:', explorerPath);
      frameRef.current.contentWindow.location = `${explorerBaseUrl}${explorerPath}`;
    }
  }, [currentPath, explorerBaseUrl, explorerPath]);

  return [
    frameRef,
    backPath,
    forwardPath,
  ];
}

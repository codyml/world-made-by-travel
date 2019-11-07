import { useRef, useEffect, useCallback } from 'react';
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
  const backHistory = useRef([]);
  const forwardHistory = useRef([]);
  const previousExplorerPath = useRef(explorerPath);
  const dispatch = useDispatch();

  //  Saves new frame path when frame sends location change message
  useEffect(() => {
    const handleMessage = (event) => {
      //  Only accept messages from explorerBaseUrl with a navigatedPath property
      if (
        explorerBaseUrl.startsWith(event.origin)
        && event.data.navigatedPath
        && event.data.navigatedPath !== explorerPath
      ) {
        previousExplorerPath.current = event.data.navigatedPath;
        dispatch({ type: SET_EXPLORER_PATH, explorerPath: event.data.navigatedPath });
        backHistory.current.push(explorerPath);
        forwardHistory.current = [];
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [dispatch, explorerBaseUrl, explorerPath]);

  //  Updates frame location when frame path in Redux changes
  useEffect(() => {
    if (explorerPath !== previousExplorerPath.current) {
      previousExplorerPath.current = explorerPath;
      frameRef.current.contentWindow.location = `${explorerBaseUrl}${explorerPath}`;
    }
  }, [explorerBaseUrl, explorerPath]);

  //  Goes back one history step
  const goBack = useCallback(() => {
    if (backHistory.current.length) {
      const backPath = backHistory.current.pop();
      dispatch({ type: SET_EXPLORER_PATH, explorerPath: backPath });
      forwardHistory.current.push(explorerPath);
    }
  }, [dispatch, explorerPath]);

  //  Goes forward one history step
  const goForward = useCallback(() => {
    if (forwardHistory.current.length) {
      const forwardPath = forwardHistory.current.pop();
      dispatch({ type: SET_EXPLORER_PATH, explorerPath: forwardPath });
      backHistory.current.push(explorerPath);
    }
  }, [dispatch, explorerPath]);

  return [
    frameRef,
    backHistory.current.length ? goBack : null,
    forwardHistory.current.length ? goForward : null,
  ];
}

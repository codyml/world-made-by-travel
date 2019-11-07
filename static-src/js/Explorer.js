import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNamesBind from 'classnames/bind';

import style from 'styles/Explorer.module.css';
import { SET_EXPLORER_PATH, SET_EXPLORER_OPEN } from './constants';


const cx = classNamesBind.bind(style);


/*
* Custom hook that detects location changes inside the frame and
* updates Redux accordingly, detects Redux changes and updates frame
* location accordingly, and links the forward/back buttons to the
* frame's document history.
*/

function useFrameNavigation() {
  const frameRef = useRef();
  const explorerBaseUrl = useSelector((state) => state.config.explorerBaseUrl);
  const explorerPath = useSelector((state) => state.explorerPath);
  const [{
    backPath,
    currentPath,
    forwardPath,
  }, setFrameNavState] = useState({ currentPath: explorerPath });

  const dispatch = useDispatch();
  const navigateToPath = useCallback((path) => {
    console.log('updating frame location:', path);
    frameRef.current.contentWindow.location = `${explorerBaseUrl}${path}`;
  }, [explorerBaseUrl]);

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
      console.log('redux location changed:', explorerPath);
      navigateToPath(explorerPath);
    }
  }, [currentPath, explorerPath, navigateToPath]);

  return [
    frameRef,
    backPath,
    forwardPath,
    navigateToPath,
  ];
}


/*
* Renders an embedded version of the Grand Tour Explorer.
*/

export default function Explorer() {
  const explorerOpen = useSelector((state) => state.explorerOpen);
  const explorerPath = useSelector((state) => state.explorerPath);
  const explorerBaseUrl = useSelector((state) => state.config.explorerBaseUrl);
  const dispatch = useDispatch();
  const toggleExplorerOpen = () => dispatch({
    type: SET_EXPLORER_OPEN,
    explorerOpen: !explorerOpen,
  });

  const [
    frameRef,
    backPath,
    forwardPath,
    navigateToPath,
  ] = useFrameNavigation();

  return (
    <div className={cx(style.Explorer, { explorerOpen })}>

      {/* Explorer tab */}
      <div className={style.tabWrapper}>
        <div className={style.tab}>
          <div
            className={style.button}
            onClick={toggleExplorerOpen}
          >
            Explorer
          </div>
        </div>
      </div>

      <div className={style.inner}>

        {/* Navbar */}
        <div className={style.navBar}>
          <div className={style.backForwardButtons}>
            <a
              className={style.backButton}
              onClick={() => backPath && navigateToPath(backPath)}
              disabled={!backPath}
              title={backPath}
            >
              ◀︎
            </a>
            <a
              className={style.forwardButton}
              onClick={() => forwardPath && navigateToPath(forwardPath)}
              disabled={!forwardPath}
              title={forwardPath}
            >
              ▶︎
            </a>
          </div>
          <div className={style.pathBar}>{explorerPath}</div>
          <a
            className={style.openButton}
            href={`${explorerBaseUrl}${explorerPath}`}
            target="explorer"
          >
            Open in New Tab
          </a>
        </div>

        {/* Frame */}
        <iframe
          className={style.frame}
          title="Explorer"
          src={explorerBaseUrl}
          ref={frameRef}
        />

      </div>
    </div>
  );
}

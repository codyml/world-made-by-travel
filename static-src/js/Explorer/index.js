import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import classNamesBind from 'classnames/bind';

import style from 'styles/Explorer.module.css';
import useFrameNavigation from './useFrameNavigation';
import { SET_EXPLORER_PATH, SET_EXPLORER_OPEN } from '../constants';


const cx = classNamesBind.bind(style);


/*
* Renders an embedded version of the Grand Tour Explorer.
*/

export default function Explorer() {
  const location = useLocation();
  const history = useHistory();
  const explorerOpen = useSelector((state) => state.explorerOpen);
  const explorerPath = useSelector((state) => state.explorerPath);
  const explorerBaseUrl = useSelector((state) => state.config.explorerBaseUrl);
  const dispatch = useDispatch();
  const [
    frameRef,
    goBack,
    goForward,
  ] = useFrameNavigation();

  const setExplorerPath = useCallback((path) => dispatch({
    type: SET_EXPLORER_PATH,
    explorerPath: path,
  }), [dispatch]);

  const toggleExplorerOpen = () => dispatch({
    type: SET_EXPLORER_OPEN,
    explorerOpen: !explorerOpen,
  });

  //  Opens the explorer to the specified path in case of search
  //  param ?explorer=/#/entry/....
  useEffect(() => {
    const parsedSearch = queryString.parse(location.search);
    if (parsedSearch.explorerPath && explorerPath === '/') {
      const searchExplorerPath = decodeURIComponent(parsedSearch.explorerPath);
      setExplorerPath(searchExplorerPath);
    }
  }, [explorerPath, history, location, setExplorerPath]);

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
              onClick={goBack}
              disabled={!goBack}
            >
              ◀︎
            </a>
            <a
              className={style.forwardButton}
              onClick={goForward}
              disabled={!goForward}
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

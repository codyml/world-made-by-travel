import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

import { BOOK_CONTENT_RECEIVED } from '../constants';
import LoadingMessage from './LoadingMessage';
import CoverView from './Cover';
import ReaderView from './ReaderView';
import Explorer from './Explorer';
import Modal from './Modal';
import { BrowserSizeContext, BREAKPOINT_MIN_WIDTH } from '../styles';

export default function App() {
  const [contentLoaded, setContentLoaded] = useState(false);
  const [browserSize, setBrowserSize] = useState('mobile');
  const dispatch = useDispatch();

  //  Fetches book-wide content
  useEffect(() => {
    const fetchBookContent = async () => {
      const response = await fetch('/wp-json/wmt/book-content');
      if (response.ok) {
        const { config, authors, tableOfContents } = await response.json();
        dispatch({
          type: BOOK_CONTENT_RECEIVED,
          config,
          authors,
          tableOfContents,
        });

        setTimeout(() => setContentLoaded(true), 1000);
      }
    };

    fetchBookContent();
  }, [dispatch]);

  //  Updates context on browser size change.
  useEffect(() => {
    const handleResizeChange = () => {
      const width = window.innerWidth;
      if (width < BREAKPOINT_MIN_WIDTH.tablet) {
        setBrowserSize('mobile');
      } else if (width < BREAKPOINT_MIN_WIDTH.desktop) {
        setBrowserSize('tablet');
      } else {
        setBrowserSize('desktop');
      }
    };

    window.addEventListener('resize', handleResizeChange);
    handleResizeChange();
    return () => window.removeEventListener('resize', handleResizeChange);
  }, []);

  return (
    <BrowserSizeContext.Provider value={browserSize}>
      <StyledApp>
        <LoadingMessage contentLoaded={contentLoaded} />
        { contentLoaded ? (
          <BrowserRouter>
            <CoverView />
            <ReaderView />
            <Explorer />
            <Modal />
          </BrowserRouter>
        ) : null }
      </StyledApp>
    </BrowserSizeContext.Provider>
  );
}

const StyledApp = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: #eee;
  background-clip: content-box;

  .admin-bar-showing & {
    height: calc(100vh - 32px);

    @media screen and (max-width: 782px) {
      height: calc(100vh - 46px);
    }
  }
`;

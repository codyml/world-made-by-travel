import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import { BOOK_CONTENT_RECEIVED } from '../constants';
import LoadingMessage from './LoadingMessage';
import CoverView from './CoverView';
import ReaderView from './ReaderView';
import Explorer from './Explorer';
import Modal from './Modal';

export default function App() {
  const [contentLoaded, setContentLoaded] = useState(false);
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

        setContentLoaded(true);
      }
    };

    fetchBookContent();
  }, [dispatch]);

  return (
    <StyledApp>
      <GlobalStyle />
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
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-size: 16px;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

const StyledApp = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .admin-bar-showing & {
    height: calc(100vh - 32px);

    @media screen and (max-width: 782px) {
      height: calc(100vh - 46px);
    }
  }
`;

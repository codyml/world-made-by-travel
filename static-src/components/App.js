import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

import { bookContentReceived } from '../actions';
import LoadingMessage from './LoadingMessage';
import Book from './Book';
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
        dispatch(bookContentReceived(config, authors, tableOfContents));
        setContentLoaded(true);
      }
    };

    fetchBookContent();
  }, [dispatch]);

  return (
    <StyledApp>
      <GlobalStyle />
      <LoadingMessage contentLoaded={contentLoaded} />
      { contentLoaded ? <Book /> : null }
      <Explorer />
      <Modal />
    </StyledApp>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-size: 16px;
  }
`;

const StyledApp = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .admin-bar-showing & {
    height: calc(100vh - 32px);

    @media screen and (max-width: 782px) {
      height: calc(100vh - 46px);
    }
  }
`;

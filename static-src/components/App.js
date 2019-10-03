import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Book from './Book';
import Explorer from './Explorer';
import Modal from './Modal';

export default function App() {
  const [bookContent, setBookContent] = useState(null);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [explorerUrl, setExplorerUrl] = useState('/');
  const [modalContent, setModalContent] = useState(null);

  //  Fetches book-wide content
  useEffect(() => {
    const fetchBookContent = async () => {
      const response = await fetch('/wp-json/wmt/book-content');
      if (response.ok) {
        const {
          config,
          authors,
          tableOfContents,
        } = await response.json();
        setBookContent({
          config,
          authors,
          tableOfContents,
        });
      }
    };

    fetchBookContent();
  }, []);

  return (
    <StyledApp>

      {/* Global styles */}
      <GlobalStyle />

      {/* Loading message */}
      <StyledLoadingMessage className={bookContent ? '' : 'loading'}>
        Loading...
      </StyledLoadingMessage>

      {/* Book */}
      { bookContent ? (
        <Book
          content={bookContent.tableOfContents}
          setExplorerOpen={setExplorerOpen}
          setExplorerUrl={setExplorerUrl}
          openModal={(content) => setModalContent(content)}
        />
      ) : null }

      {/* Explorer */}
      <Explorer
        isOpen={explorerOpen}
        url={explorerUrl}
        setExplorerUrl={setExplorerUrl}
      />

      {/* Modal */}
      <Modal
        content={modalContent}
        close={() => setModalContent()}
      />

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

  .admin-bar-showing & {
    height: calc(100vh - 32px);

    @media screen and (max-width: 782px) {
      height: calc(100vh - 46px);
    }
  }
`;

const StyledLoadingMessage = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s, visibility 0s 0.25s;

  &.loading {
    opacity: 1;
    visibility: visible;
    transition: opacity 0s, visibility 0s;
  }
`;

import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

import useLoadContent from './useLoadContent';
import useBrowserSize from './useBrowserSize';
import LoadingMessage from '../LoadingMessage';
import CoverView from '../Cover';
import ReaderView from '../ReaderView';
import Explorer from '../Explorer';
import Modal from '../Modal';
import MobileMenu from '../MobileMenu';

export default function App() {
  useBrowserSize();
  const contentLoaded = useLoadContent();
  const mobileMenuOpen = useSelector((state) => state.mobileMenuOpen);

  return (
    <StyledApp mobileMenuOpen={mobileMenuOpen}>
      <LoadingMessage contentLoaded={contentLoaded} />
      { contentLoaded ? (
        <BrowserRouter>
          <CoverView />
          <ReaderView />
          <Explorer />
          <Modal />
          <MobileMenu />
        </BrowserRouter>
      ) : null }
    </StyledApp>
  );
}

const StyledApp = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-clip: content-box;

  .admin-bar-showing & {
    height: calc(100vh - 32px);

    @media screen and (max-width: 782px) {
      height: calc(100vh - 46px);
    }
  }
`;

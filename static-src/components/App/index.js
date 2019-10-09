import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import useLoadContent from './useLoadContent';
import useBrowserSize from './useBrowserSize';
import LoadingMessage from '../LoadingMessage';
import CoverView from '../Cover';
import ReaderView from '../ReaderView';
import Explorer from '../Explorer';
import Modal from '../Modal';
import MobileMenu from '../MobileMenu';

import style from '../../styles/App.module.css';

export default function App() {
  useBrowserSize();
  const contentLoaded = useLoadContent();

  return (
    <div className={style.App}>
      <LoadingMessage visible={!contentLoaded} />
      { contentLoaded ? (
        <BrowserRouter>
          <CoverView />
          <ReaderView />
          <Explorer />
          <Modal />
          <MobileMenu />
        </BrowserRouter>
      ) : null }
    </div>
  );
}

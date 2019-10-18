import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';

import style from 'styles/App.module.css';
import rootReducer from './reducers';
import useLoadContent from './useLoadContent';
import useBrowserSize from './useBrowserSize';
import LoadingMessage from './LoadingMessage';
import CoverView from './Cover';
import ReaderView from './ReaderView';
import Explorer from './Explorer';
import Modal from './Modal';
import MobileMenu from './MobileMenu';


function App() {
  useBrowserSize();
  const contentLoaded = useLoadContent();

  return (
    <div className={style.App}>
      <LoadingMessage overlay visible={!contentLoaded} />
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


/*
* Applies Redux store.
*/

const store = createStore(rootReducer, devToolsEnhancer());

export default function StatefulApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
    //  feelings u provide
  );
}

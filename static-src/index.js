import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { devToolsEnhancer } from 'redux-devtools-extension';


import rootReducer from './reducers';
import App from './components/App';

const store = createStore(rootReducer, devToolsEnhancer());

const rootElement = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(
  rootElement,
  document.getElementById('App'),
);

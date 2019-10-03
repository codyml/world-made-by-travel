import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import rootReducer from './reducers';
import App from './components/App';

const store = createStore(rootReducer);

const rootElement = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(
  rootElement,
  document.getElementById('App'),
);

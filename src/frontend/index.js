import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createBrowserHistory } from 'history'; // creamos el historial
import { Router } from 'react-router'; // importamos o instalamos como depProducción

import reducer from './reducer';
import App from './routes/App';

const history = createBrowserHistory();

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(reducer, preloadedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

delete window.__PRELOADED_STATE__;

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app'),
);

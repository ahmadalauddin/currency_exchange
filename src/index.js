import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './config/configureStore';
import './index.scss';
import reportWebVitals from './reportWebVitals';

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Router>
      <App />
    </Router>
    </PersistGate>
  </Provider>,
);

// Measure performance of the app.
// Can send an analytics endpoint instead of console.log
reportWebVitals(console.log);

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';
import reportWebVitals from './reportWebVitals';

import './styles/styles.scss';
import configureStore from './store/configureStore';
import firebase from './config/firebase'
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage'


const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    reportWebVitals();
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid))
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    } else if (history.location.pathname === '/profile'){
      history.push('/dashboard')
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});

import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store/reduxstore';
import { Provider } from 'react-redux'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

window.store = store;

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
  rootElement);

registerServiceWorker();


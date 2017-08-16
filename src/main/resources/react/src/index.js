// import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './store/configureStore';

const menus = [
    { link: '#home', label: 'Home'},
    { link: '#find-pet', label: 'Find a Pet'},
    { link: '#about', label: 'About Us'},
    { link: '#drop-pet', label: 'Drop a Pet'},
    { link: '#mission', label: 'Mission'}
  ]
const store = configureStore({
    menus
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();

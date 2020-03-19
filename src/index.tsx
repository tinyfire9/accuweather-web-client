import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Countries } from './accuweather';
import { Layout, NavBar } from './components';


render(
    <Provider store={store}>
        <Layout navBar={<NavBar />} views={<Countries />} />
    </Provider>,
    document.getElementById('root'),
);

export * from './services';
export * from './constants';
export * from './interfaces';
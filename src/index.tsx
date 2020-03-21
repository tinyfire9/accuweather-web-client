import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AccuWeather } from './accuweather';
import { Layout, NavBar } from './components';


render(
    <Provider store={store}>
        <BrowserRouter>
            <Layout navBar={<NavBar />} views={<AccuWeather />} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);

export * from './services';
export * from './constants';
export * from './interfaces';
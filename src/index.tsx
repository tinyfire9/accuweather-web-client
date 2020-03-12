import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { CountryListView } from './accuweather';

render(
    <Provider store={store}>
        <CountryListView />
    </Provider>,
    document.getElementById('root'),
);

export * from './services';
export * from './constants';
export * from './interfaces';
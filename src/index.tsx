import React from 'react';
import { render } from 'react-dom';
import { CountryListView } from './accuweather';

render(
    <CountryListView />,
    document.getElementById('root'),
);

export * from './constants';
export * from './interfaces';
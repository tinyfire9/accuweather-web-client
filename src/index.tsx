import React from 'react';
import { render } from 'react-dom';
import { CountryView } from './accuweather';

render(
    <CountryView />,
    document.getElementById('root'),
);

export * from './constants';
export * from './interfaces';
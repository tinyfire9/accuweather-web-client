import { Country } from './accuweather/country-list';

export interface HTTPErrorResponse {
    '400': string,
    '401': string,
    '404': string,
    '500': string,
    '503': string,
}

export interface StoreState {
    locations: {
        countries: Country[],
    },
};

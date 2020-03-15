import { Country, Region } from './accuweather/country-list';

export interface HTTPErrorResponse {
    '400': string,
    '401': string,
    '404': string,
    '500': string,
    '503': string,
}

export interface StoreState {
    countries: Country[];
    regions: Region[];
};

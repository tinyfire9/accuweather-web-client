import { combineReducers } from "redux";

import { countriesReducer } from './accuweather/country-list/reducer';

export let reducer = combineReducers({
    countries: countriesReducer,
});

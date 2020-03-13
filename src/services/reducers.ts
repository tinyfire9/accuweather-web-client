import { Action } from "./interfaces";
import { StoreState } from '../interfaces';
import { combineReducers } from "redux";
import { ACTION_TYPE } from "./action-types";

let initialState: StoreState = {
    locations: {
        countries: [],
    },
};

let countriesReducer = (state: StoreState = initialState, action: Action) => {
    switch(action.type) {
        case ACTION_TYPE.FETCH_DATA_SUCCESS: {
            let newState: StoreState = {...state};
            newState.locations.countries = action.body;

            return state;
        };

        case ACTION_TYPE.FETCH_DATA_ERROR:
        default: {
            return state;
        }
    }
}

export let reducer = combineReducers({
    countries: countriesReducer,
});

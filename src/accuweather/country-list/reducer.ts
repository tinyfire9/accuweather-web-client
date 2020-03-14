import { ACTION_TYPE, Action } from "../../services";
import { Country } from './index';

export let countriesReducer = (state: any = [], action: Action) => {
    switch(action.type) {
        case ACTION_TYPE.FETCH_DATA_SUCCESS:
            return action.body.sort((c1: Country, c2: Country) => c1.EnglishName > c2.EnglishName ? 1 : -1);
        case ACTION_TYPE.FETCH_DATA_ERROR:
            return [];
        default: {
            return state;
        }
    }
}
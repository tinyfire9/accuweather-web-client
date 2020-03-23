import { reducer } from './reducer';
import { FEATURE, SERVICE } from '../constants';
import { fetchDataSuccessAction, fetchDataErrorAction } from './actions';

it('should update the state with the new data', () => {
    let action = fetchDataSuccessAction(FEATURE.region, SERVICE.locations, 200, [{ ID: 'ID'}], 'OK');
    let state: any = {
        regions: [],
        countries: [{ID: 'CID'}],
    };

    expect(reducer(state, action)).toEqual({
        regions: [{ID: 'ID'}],
        countries: [{ID: 'CID'}],
    });
});


it('should return the current state', () => {
    let action = fetchDataErrorAction(FEATURE.region, SERVICE.locations, 400);
    let state: any = {
        regions: [],
        countries: [{ID: 'CID'}],
    };

    expect(reducer(state, action)).toEqual(state);
});

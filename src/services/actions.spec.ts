import { FEATURE, SERVICE } from '../constants';
import { ACTION_TYPE } from './action-types';
import { fetchDataAction, fetchDataSuccessAction, fetchDataErrorAction } from './actions';

it('should create fetchData action', () => {
    let action = fetchDataAction(FEATURE.region, SERVICE.locations, '/route');

    expect(action).toEqual({
        type: ACTION_TYPE.FETCH_DATA,
        feature: FEATURE.region,
        service: SERVICE.locations,
        route: '/route',
    })
});

it('should create fetchDataSuccess action', () => {
    let action = fetchDataSuccessAction(FEATURE.region, SERVICE.locations, 200, 'body', 'OK');

    expect(action).toEqual({
        type: ACTION_TYPE.FETCH_DATA_SUCCESS,
        feature: FEATURE.region,
        service: SERVICE.locations,
        body: 'body',
        status: 200,
        statusText: 'OK'
    });
})

it('should create fetchDataError action', () => {
    let action = fetchDataErrorAction(FEATURE.region, SERVICE.locations, 401, 'err');

    expect(action).toEqual({
        type: ACTION_TYPE.FETCH_DATA_ERROR,
        feature: FEATURE.region,
        service: SERVICE.locations,
        status: 401,
        statusText: 'err'
    });
});
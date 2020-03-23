import { FEATURE, SERVICE } from '../constants';
import { ACTION_TYPE } from './action-types';
import { Action } from './interfaces';

export let fetchDataAction = (feature: FEATURE, service: SERVICE, route?: string): Action => ({
    type: ACTION_TYPE.FETCH_DATA,
    feature, service, route,
});

export let fetchDataErrorAction = (feature: FEATURE, service: SERVICE, status: number, statusText?: string): Action => ({
    type: ACTION_TYPE.FETCH_DATA_ERROR,
    feature, service, status, statusText,
});

export let fetchDataSuccessAction = (feature: FEATURE, service: SERVICE, status: number, body?: any, statusText?: string): Action => ({
    type: ACTION_TYPE.FETCH_DATA_SUCCESS,
    feature, service, status, statusText, body,
});

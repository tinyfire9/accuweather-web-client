import { ACTION_TYPE } from './action-types';
import { SERVICE, FEATURE } from '../constants';

export interface Action {
    type: ACTION_TYPE;
    service: SERVICE;
    feature: FEATURE;
    route?: string;
    status?: number;
    statusText?: string;
    body?: any;
}

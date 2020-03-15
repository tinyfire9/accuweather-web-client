import { FEATURE, SERVICE, Action, fetchDataAction } from '../..';

export let fetchRegionsAction = (): Action => fetchDataAction(FEATURE.region, SERVICE.locations, `/${FEATURE.region}`);
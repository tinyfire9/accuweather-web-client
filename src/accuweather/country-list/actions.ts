import { fetchDataAction } from '../../services'
import { FEATURE, SERVICE } from '../../constants';

export let fetchCountriesAction = () => fetchDataAction(FEATURE.country, SERVICE.locations, `/${FEATURE.country}`);
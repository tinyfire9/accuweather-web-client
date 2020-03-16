import { fetchDataAction } from '../../services'
import { FEATURE, SERVICE } from '../../constants';

export let fetchCountriesAction = (regionID?: string) => 
    fetchDataAction(FEATURE.country, SERVICE.locations, `/${FEATURE.country}${regionID ? '/'+ regionID : ''}`);
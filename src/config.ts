import { ReactElement } from 'react';
import { SERVICE, FEATURE } from './constants';
import { Countries } from './accuweather/locations';
import { ConnectedComponent } from 'react-redux';

interface UIConfig {
    route: string;
    component?: ConnectedComponent<any, any> | React.Component | ReactElement | Element | null;
}

interface FeatureUIConfig extends UIConfig {
    name: FEATURE;
}

export interface ServiceUIConfig extends UIConfig {
    name: SERVICE;
    features?: FeatureUIConfig[];
}

export let uiConfig: ServiceUIConfig[]  = [
    {
        name: SERVICE.locations,
        route: `/${SERVICE.locations}`,
        features: [
            {
                name: FEATURE.country,
                route: `/${FEATURE.country}`,
                component: Countries,
            }
        ]
    },
];
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { uiConfig, ServiceUIConfig, FeatureUIConfig } from '../config';

export let AccuWeather = (props: any) => {
    let views: any = [];
    uiConfig.forEach((config: ServiceUIConfig) => {
        mapRoutesToComponents(config, views);
    });

    return (
        <Switch>
            {views}
        </Switch>
    )
}

let mapRoutesToComponents = (config: ServiceUIConfig, routes: any  = [], prefix: string = "") => {
    let route = `${ prefix + config.route }`;
    if(config.component) {
        routes.push(
            <Route path={route}>
                <config.component />
            </Route>
        );
    } 
    
    if(config.features) {
        config.features.forEach((feature: any) => {
            mapRoutesToComponents(feature, routes, config.route);
        });
    }
}

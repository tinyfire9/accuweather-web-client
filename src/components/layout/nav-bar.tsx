import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { uiConfig, ServiceUIConfig } from '../../config';

class NavBar extends React.Component <any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            tabValue: '',
        };
    }


    public render(){
        return (
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={this.state.value}
            >
                {
                    uiConfig.map((config: ServiceUIConfig) => {
                        return <Tab label={config.name}/>
                    })
                }
            </Tabs>
        );
    }
}

export default NavBar;
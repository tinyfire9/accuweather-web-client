import React from 'react';
import { Paper, Tabs, Tab, withStyles } from '@material-ui/core';
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
            <Paper className={this.props.classes.navbar}>
                <Tabs
                    className="aw-nav-bar-item aw-nav-bar-tabs"
                    orientation="vertical"
                    variant="scrollable"
                    value={this.state.value}
                >
                    {
                        uiConfig.map((config: ServiceUIConfig) => {
                            return <Tab className="aw-nav-bar-item aw-nav-bar-tab" label={config.name}/>
                        })
                    }
                </Tabs>
            </Paper>
        );
    }
}


let style = {
    navbar: {
        height: `${window.innerHeight*.85}px`
    }
};

export default withStyles(style)(NavBar);
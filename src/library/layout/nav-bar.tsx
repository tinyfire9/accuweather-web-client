import React from 'react';
import {
    Paper, Tabs, Tab, withStyles,
    ExpansionPanel, ExpansionPanelDetails,
    ExpansionPanelSummary,
} from '@material-ui/core';
import { uiConfig, ServiceUIConfig, FeatureUIConfig } from '../../config';
import { Link } from 'react-router-dom';

class NavBar extends React.Component <any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            tabValue: '',
        };
    }

    private makeNavExansionPanel(service: ServiceUIConfig){
        if(!service.features){
            return (
                <ExpansionPanel>
                    <ExpansionPanelSummary>
                        <Tab label={service.name}/>
                    </ExpansionPanelSummary>
                </ExpansionPanel>
            )
        }

        let tabs = service.features.map(
            (feature: FeatureUIConfig) => (
                <ExpansionPanelDetails>
                    <Link className={this.props.classes.navBarLink} to={service.route + feature.route}>
                        <Tab label={feature.name}/>
                    </Link>
                </ExpansionPanelDetails>
            )
        );

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary><Tab label={service.name}/></ExpansionPanelSummary>
                { tabs }
            </ExpansionPanel>
        )
    }

    public render(){
        let navExpansionPanels = uiConfig.map((service: ServiceUIConfig) => this.makeNavExansionPanel(service));

        return (
            <Paper className={this.props.classes.navbar}>
                <Tabs
                    className="aw-nav-bar-item aw-nav-bar-tabs"
                    orientation="vertical"
                    variant="scrollable"
                    value={this.state.value}
                >
                    {navExpansionPanels}
                </Tabs>
            </Paper>
        );
    }
}


let style = {
    navbar: {
        height: `${window.innerHeight*.85}px`
    },
    navBarLink: {
        color: 'inherit',
        'text-decoration': 'none',
        'text-indent': '20px'
    }
};

export default withStyles(style)(NavBar);
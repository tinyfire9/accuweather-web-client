import React, { ReactElement } from 'react';
import { ConnectedComponent } from 'react-redux';
import { Paper, Grid, withStyles } from '@material-ui/core';
import './layout.scss';

interface LayoutProps {
    navBar: ConnectedComponent<any,any> | React.Component | ReactElement | Element | null;
    views: ConnectedComponent<any,any> | React.Component | ReactElement | Element | null;
    classes: any;
}

class Layout extends React.Component<LayoutProps, any>{
    public render() {
        return (
            <Grid container spacing={3} className={this.props.classes.layout}>
                <Grid item xs={12}><Paper className="aw-title">AccuWeather API Dashboard</Paper></Grid>
                <Grid item sm={2}>{this.props.navBar}</Grid>
                <Grid item xs={10} >{this.props.views}</Grid>
            </Grid>
        );
    }

}

let style = {
    layout: {
        height: `${window.outerHeight*.80}px`
    }
}

export default withStyles(style)(Layout);
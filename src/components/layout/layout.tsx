import React, { ReactElement } from 'react';
import { ConnectedComponent } from 'react-redux';
import { Paper } from '@material-ui/core';

interface LayoutProps {
    navBar: ConnectedComponent<any,any> | React.Component | ReactElement | Element | null;
    views: ConnectedComponent<any,any> | React.Component | ReactElement | Element | null;
}

class Layout extends React.Component<LayoutProps, any>{
    public render() {
        return (
            <Paper className="aw">
                <Paper className="aw-title">
                    AccuWeather API Dashboard
                </Paper>

                <Paper className="aw-nav-bar">
                    { this.props.navBar }
                </Paper>

                <Paper className="aw-app">
                    { this.props.views }
                </Paper>
            </Paper>
        );
    }

}

export default Layout;
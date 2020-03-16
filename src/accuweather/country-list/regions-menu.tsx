import React from 'react';

import { connect } from 'react-redux';
import { Region } from '.';
import { Menu, MenuItem, Button } from '@material-ui/core';

interface RegionsMenuState {
    region: string;
    open: boolean;
    anchorEl?: null |  Element;
}

interface RegionsMenuProps {
    region: string;
    regions: Region[];
    onRegionSelect: (regionID: string) => any;
}

class RegionsMenu extends React.Component<RegionsMenuProps, RegionsMenuState> {
    constructor(props: any) {
        super(props);
        this.state = {
            region: 'All',
            open: false,
            anchorEl: null,
        }
    }

    private onClose(region?: string) {
        let state: any = { anchorEl: null }
        if(region) {
            state.region = region;
        }
        this.setState(state);
    }

    private setAnchorEl (event: Event) {
        this.setState({ anchorEl: event.currentTarget } as any);
    }

    public render() {
        let allRegionsMenuItem = (
            <MenuItem
                onClick={() => {
                    this.props.onRegionSelect('all');
                    this.onClose();
                }}
            >
                All
            </MenuItem>
        );
        let regionsMenuItems = [...this.props.regions.map((region: Region) => {
            return (
                <MenuItem 
                    onClick={() => {
                        this.props.onRegionSelect(region.ID);
                        this.onClose(region.EnglishName);
                    }}
                >
                    {region.EnglishName}
                </MenuItem>
            )
        }), allRegionsMenuItem];

        return (
            <div className="regions-menu">
                <Button aria-haspopup="true" onClick={(event: any) => this.setAnchorEl(event)} >{this.state.region}</Button>
                <Menu
                    keepMounted={true}
                    anchorEl={this.state.anchorEl}
                    onClose={() => this.onClose()}
                    open={this.state.anchorEl ? true : false}
                >
                    {regionsMenuItems}
                </Menu>
            </div>
        );
    }
}

export default connect(null, null)(RegionsMenu);
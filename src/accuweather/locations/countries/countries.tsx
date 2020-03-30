import React, { Fragment } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

import { StoreState } from '../../../interfaces';
import { fetchCountriesAction } from './actions';
import { fetchRegionsAction } from '../regions';
import {  fetchDataThunkAction, Action } from '../../../services';
import RegionsMenu from './regions-menu';
import { Location } from '../../';
import { AWTable } from '../../../library'
import './style.scss';

export type Country = Location;
export type Region = Location;

interface CountriesProps {
    countries?: Country[];
    regions?: Region[];
    fetchCountries: (regionID?: string) => any;
    fetchRegions: () => any;
}

class CountriesView extends React.Component<CountriesProps, any> {

    public componentDidMount() {
        this.props.fetchCountries();
        this.props.fetchRegions();
    }

    private onRegionSelect(region: string) {
        if(region.toLowerCase() === 'all') {
            this.props.fetchCountries();
        } else {
            this.props.fetchCountries(region);
        }
    }

    public render(){
        let columns: string[] = [
            'ID',
            'Localized Name',
            'English Name',
        ];
        let countries = this.props.countries || [];

        return (
            <Fragment>
                <RegionsMenu
                    region="all"
                    regions={this.props.regions || []}
                    onRegionSelect={(region:string) => this.onRegionSelect(region)}
                />
                <AWTable
                    header={columns}
                    data={
                        countries
                            .sort((c1: Country, c2: Country) => c1.EnglishName > c2.EnglishName ? 1 : -1)    
                            .map(({ ID, EnglishName, LocalizedName }: Country) => [ID, LocalizedName, EnglishName])
                    }
                />
            </Fragment>
        );
    }
}

let mapStateToProps = ({ countries, regions }: StoreState) => ({ countries, regions });
let mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, any, Action>) => ({
    fetchCountries: (regionID?: string) => dispatch(fetchDataThunkAction(fetchCountriesAction(regionID))),
    fetchRegions: () => dispatch(fetchDataThunkAction(fetchRegionsAction())),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesView);

import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchRegionsAction } from './actions';
import { AWTable } from '../../../library';
import { fetchDataThunkAction, Action } from '../../../services';
import { Location } from '../interfaces';
import { StoreState } from '../../../interfaces';

type Region = Location;

interface RegionsProps {
    regions: Region[]
    fetchRegions(): any; 
}

class RegionsView extends React.Component<RegionsProps, any> {
    public componentDidMount() {
        this.props.fetchRegions();
    }

    public render(){
        let header = [
            'ID',
            'English Name',
            'Localized Name',
        ];
        let { regions } = this.props;

        return (
            <AWTable
                header={header}
                data={
                    regions
                        .sort((r1: Region, r2: Region) => r1.EnglishName > r2.EnglishName ? 1 : -1)
                        .map(({ ID, LocalizedName, EnglishName }: Region) => [ID, EnglishName, LocalizedName])
                }
            />
        );
    }
}

let mapStateToProps = (state: StoreState) => ({ regions: state.regions });
let mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, any, Action>) => ({
    fetchRegions: () => dispatch(fetchDataThunkAction(fetchRegionsAction())),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegionsView);
import React, { Fragment } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import {
    Table, TableCell, TableBody,
    TableRow, TableHead, TableContainer,
    Paper, TablePagination, TableFooter,
    withStyles
} from '@material-ui/core';

import { StoreState } from '../../../interfaces';
import { fetchCountriesAction } from './actions';
import { fetchRegionsAction } from '../regions';
import {  fetchDataThunkAction, Action } from '../../../services';
import RegionsMenu from './regions-menu';
import { Location } from '../../';
import './style.scss';

export type Country = Location;
export type Region = Location;

interface CountriesState {
    regions: Region[];
    page: number;
    rowsPerPage: number;
}

interface CountriesProps {
    countries?: Country[];
    regions?: Region[];
    fetchCountries: (regionID?: string) => any;
    fetchRegions: () => any;
    classes: any;
}

let style = {
    table: {
        height: `${window.innerHeight*.80}px`,
    }
};

class CountriesView extends React.PureComponent<CountriesProps, CountriesState> {
    constructor(props: CountriesProps){
        super(props);
        this.state = {
            regions: [],
            page: 0,
            rowsPerPage: 15,
        }
    }

    public componentDidMount() {
        this.props.fetchCountries();
        this.props.fetchRegions();
    }

    private onRegionSelect(region: string) {
        this.setState({ page: 0 });
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
        let { page, rowsPerPage } = this.state;
        let countries = this.props.countries || [];

        return (
            <Fragment>
                <RegionsMenu
                    region="all"
                    regions={this.props.regions || []}
                    onRegionSelect={(region:string) => this.onRegionSelect(region)}
                />
                <TableContainer component={Paper} className={this.props.classes.table + ' countries-table-container'}>
                    <Table size="small" stickyHeader={true}  >
                        <TableHead>
                            {
                                <TableRow>
                                    { columns.map((column:string) => (<TableCell key={column}>{column}</TableCell>)) }
                                </TableRow>
                            }
                        </TableHead>
                        <TableBody>
                            {
                                countries
                                    .sort((c1: Country, c2: Country) => c1.EnglishName > c2.EnglishName ? 1 : -1)
                                    .slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage)
                                    .map(({ ID, LocalizedName, EnglishName }: Country) => (
                                        <TableRow key={ID}>
                                            <TableCell>{ID}</TableCell>
                                            <TableCell>{LocalizedName}</TableCell>
                                            <TableCell>{EnglishName}</TableCell>
                                        </TableRow>
                                    ))
                            }
                        </TableBody>
                    </Table>
                    <TableFooter className="countries-table-footer">
                        <TablePagination
                            rowsPerPageOptions={[]}
                            labelRowsPerPage={false}
                            page={page}
                            count={countries.length}
                            rowsPerPage={rowsPerPage}
                            component="div"
                            onChangePage={(event, newPage) => this.setState({ page: newPage })}
                        />
                    </TableFooter>
                </TableContainer>
            </Fragment>
        );
    }
}

let mapStateToProps = ({ countries, regions }: StoreState) => ({ countries, regions });
let mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, any, Action>) => ({
    fetchCountries: (regionID?: string) => dispatch(fetchDataThunkAction(fetchCountriesAction(regionID))),
    fetchRegions: () => dispatch(fetchDataThunkAction(fetchRegionsAction())),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(style)(CountriesView)
);

import React from 'react';
import { connect } from 'react-redux';
import {
    Table, TableCell, TableBody,
    TableRow, TableHead, TableContainer,
    Paper, TablePagination, TableFooter,
} from '@material-ui/core';

import { ThunkDispatch } from 'redux-thunk';
import { StoreState } from '../../interfaces';
import { fetchCountriesAction } from './actions';
import { fetchRegionsAction } from '../regions';
import {  fetchDataThunkAction, Action } from '../../services';
import { Location } from '../';

export type Country = Location;
export type Region = Location;

interface CountryListState {
    regions: Region[];
    page: number;
    rowsPerPage: number;
}

interface CountryListProps {
    countries?: Country[];
    regions?: Region[];
    fetchCountries: () => any;
    fetchRegions: () => any;
}

class CountryListView extends React.Component<CountryListProps, CountryListState> {
    constructor(props: any){
        super(props);
        this.state = {
            regions: [],
            page: 0,
            rowsPerPage: 10,
        }
    }

    public componentDidMount() {
        this.props.fetchCountries();
        this.props.fetchRegions();
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
            <TableContainer component={Paper}>
                <Table size="small" stickyHeader={true} >
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
                <TableFooter>
                    <TablePagination
                        page={page}
                        rowsPerPageOptions={[10, 25, 50, 100, {label: 'All', value: -1}]}
                        count={countries.length}
                        rowsPerPage={rowsPerPage}
                        component="div"
                        onChangePage={(event, newPage) => this.setState({ page: newPage })}
                        onChangeRowsPerPage={(event) => this.setState({
                            rowsPerPage: +event.target.value,
                        })}
                    />
                </TableFooter>
            </TableContainer>
        );
    }
}

let mapStateToProps = ({ countries, regions }: StoreState) => ({ countries, regions });
let mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, any, Action>) => ({
    fetchCountries: () => dispatch(fetchDataThunkAction(fetchCountriesAction())),
    fetchRegions: () => dispatch(fetchDataThunkAction(fetchRegionsAction())),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryListView);

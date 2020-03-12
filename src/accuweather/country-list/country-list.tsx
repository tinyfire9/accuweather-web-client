import React from 'react';
import { connect } from 'react-redux';
import {
    Table, TableCell, TableBody,
    TableRow, TableHead, TableContainer,
    Paper, TablePagination, TableFooter,
} from '@material-ui/core';

import { fetchCountriesAction } from './actions';
import { StoreState } from '../../interfaces';
import {  fetchDataThunkAction, Action } from '../../services'

interface Location {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
}

export type Country = Location;
export type Region = Location;

interface CountryListState {
    list: Country[];
    regions: Region[];
    page: number;
    rowsPerPage: number;
}

interface CountryListProps {
    fetchData: (action: Action) => any;
}

class CountryListView extends React.Component<CountryListProps, CountryListState> {
    constructor(props: any){
        super(props);
        this.state = {
            list: [],
            regions: [],
            page: 0,
            rowsPerPage: 10,
        }
    }

    componentDidMount() {
        this.props.fetchData(fetchCountriesAction());
    }

    render(){
        let columns: string[] = [
            'ID',
            'Localized Name',
            'English Name',
        ];
        let { page, rowsPerPage } = this.state;

        return (
            <TableContainer component={Paper}>
                <Table size="small" stickyHeader={true} >
                    <TableHead>
                        {
                            <TableRow>
                                { columns.map((column:string) => (<TableCell>{column}</TableCell>)) }
                            </TableRow>
                        }
                    </TableHead>
                    <TableBody>
                        {
                            this.state.list
                                .slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage)
                                .map(({ ID, LocalizedName, EnglishName }: Country) => (
                                    <TableRow>
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
                        page={this.state.page}
                        rowsPerPageOptions={[10, 25, 50, 100, {label: 'All', value: -1}]}
                        count={this.state.list.length}
                        rowsPerPage={this.state.rowsPerPage}
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

let mapDispatchToProps = () => ({
    fetchData: fetchDataThunkAction,
});


export default connect(
    null,
    mapDispatchToProps
)(CountryListView);

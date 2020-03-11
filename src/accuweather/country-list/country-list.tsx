import React from 'react';
import {
    Table, TableCell, TableBody,
    TableRow, TableHead, TableContainer,
    Paper, TablePagination, TableFooter,
} from '@material-ui/core';
import { API_KEY, BASE_URL, ENTITIES } from '../../constants';

interface Country {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
}

interface CountryListState {
    list: Country[];
    page: number;
    rowsPerPage: number;

}

export class CountryListView extends React.Component<any, CountryListState> {
    constructor(props: any){
        super(props);
        this.state = {
            list: [],
            page: 0,
            rowsPerPage: 10,
        }
    }

    componentDidMount() {
        fetch(`${BASE_URL}/${ENTITIES.locations}/v1/countries?apikey=${API_KEY}`)
            .then((res: Response) => res.json())
            .then((data: Country[]) => {
                data = JSON.parse(JSON.stringify(data))
                    .sort((c1: Country, c2: Country) => {
                        if(c1.LocalizedName > c2.LocalizedName) {
                            return 1;
                        } else {
                            return -1;
                        }
                    });
                this.setState({ list: data });
            })
            .catch((err: Error) => {
                console.log(err);
            });
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
                                {columns.map((column:string) => (<TableCell>{column}</TableCell>))}
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

import React from 'react';
import {
    Table, TableCell, TableBody,
    TableRow, TableHead, TableContainer,
    Paper, TablePagination, TableFooter,
    withStyles
} from '@material-ui/core';
import './style.scss';

let style = {
    table: {
        height: `${window.innerHeight*.80}px`,
    }
};

interface AWTableProps {
    classes: any;
    header: any[];
    data: any[][];
}

interface AWTableState {
    page: number;
    rowsPerPage: number;
}

class AWTable extends React.Component<AWTableProps, AWTableState> {
    constructor(props: AWTableProps){
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 15,
        }
    }

    public render() {
        let { page, rowsPerPage } = this.state;
        let { header, data } = this.props;

        return (
            <TableContainer component={Paper} className={this.props.classes.table + ' table-container'}>
                <Table size="small" stickyHeader={true}  >
                    <TableHead>
                        {
                            <TableRow>
                                { header.map((column:string) => (<TableCell key={column}>{column}</TableCell>)) }
                            </TableRow>
                        }
                    </TableHead>
                    <TableBody>
                        {
                            data
                                .slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage)
                                .map((row: any[]) => (
                                    <TableRow>
                                        {row.map(tableCell => <TableCell>{tableCell}</TableCell>)}
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
                <TableFooter className="table-footer">
                    <TablePagination
                        rowsPerPageOptions={[]}
                        labelRowsPerPage={false}
                        page={page}
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        component="div"
                        onChangePage={(event, newPage) => this.setState({ page: newPage })}
                    />
                </TableFooter>
            </TableContainer>
        )
    }
}

export default withStyles(style)(AWTable);
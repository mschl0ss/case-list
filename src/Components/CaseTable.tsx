import React from 'react';
import {CaseStatus} from "../Utils/Types";
import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import moment, {Moment} from "moment";
import CaseTableRow from "./CaseTableRow";

const useStyles = makeStyles({
    root: {
        margin: "15px auto",
        minWidth: 650,
        maxWidth: 900,
    },
    table: {
        minWidth: 650,
    },
});

function createData(title: string, caseStatus: CaseStatus, date: Moment, name: string) {
    return {title, caseStatus, date, name};
}

const rows = [
    createData('Sample 1', "Created", moment.utc(), "Otis"),
    createData('Sample 2', "Submitted", moment.utc(), "Evey"),
    createData('Sample 3', "Approved", moment.utc(), "Willa"),
];

export default function CaseTable(): JSX.Element {

    const classes = useStyles();

    return(
        <TableContainer component={Paper} className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Title</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="right">User</TableCell>
                        <TableCell align="right">Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <CaseTableRow row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
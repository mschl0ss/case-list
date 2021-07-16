import React from 'react';
import {Case, CaseStatus} from "../Utils/Types";
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

const caseRows: Case[] = [
    {
        title: "Sample 1",
        dateCreated: moment.utc().subtract(1, "day"),
        dateUpdated: moment.utc(),
        caseStatus: "Created",
        notes: "Lorem ipsum dolor sit amet",
        userName: "Otis",
    },
    {
        title: "Sample 2",
        dateCreated: moment.utc().subtract(1, "day"),
        dateUpdated: moment.utc(),
        caseStatus: "Created",
        notes: "Lorem ipsum dolor sit amet",
        userName: "Evey",
    },
    {
        title: "Sample 3",
        dateCreated: moment.utc().subtract(1, "day"),
        dateUpdated: moment.utc(),
        caseStatus: "Created",
        notes: "Lorem ipsum dolor sit amet",
        userName: "Willa",
    }
]

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
                        <TableCell align="right">Date Updated</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {caseRows.map((caseRow) => (
                        <CaseTableRow key={caseRow.title} caseProp={caseRow}/>
                    ))}
                    <TableRow>
                        <TableCell colSpan={6}>
                            + New Case
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
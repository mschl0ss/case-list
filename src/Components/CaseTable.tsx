import React, {useContext, useEffect} from 'react';
import {Case} from "../Utils/Types";
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
import moment from "moment";
import CaseTableRow from "./CaseTableRow";
import CaseTableRowNew from "./CaseTableRowNew";
import {CaseStoreContext} from "./State/CaseStore";

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

export default function CaseTable(): JSX.Element {
    const classes = useStyles();
    const { cases, filters } = useContext(CaseStoreContext);

    const casesToShow = (): Case[] => {
        if(filters.length === 0) { return cases; }
        return cases.filter(caseArg => filters.includes(caseArg.caseStatus))
    }

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
                    <CaseTableRowNew />
                    {casesToShow().map((caseArg) => (
                        <CaseTableRow key={caseArg.id} caseProp={caseArg}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
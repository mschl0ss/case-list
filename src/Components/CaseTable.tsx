import React, {useContext, useEffect, useState} from 'react';
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
import CaseTableRow from "./CaseTableRow";
import CaseTableRowNew from "./CaseTableRowNew";
import {CaseStoreContext} from "./State/CaseStore";
import moment from "moment";

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
    const { cases, filters, searchQuery } = useContext(CaseStoreContext);
    const [casesToShow, setCasesToShow] = useState<Case[]>([]);

    useEffect(() => {
        let newCaseList;
        const noFilters = filters.length === 0;
        const noSearchQuery = searchQuery === undefined || searchQuery.length === 0;
        if(noFilters && noSearchQuery) {
            newCaseList = cases;
        } else {
            newCaseList = cases
                .filter(caseArg => {
                    if(filters.length === 0) {return true}
                    return filters.includes(caseArg.caseStatus)
                })
                .filter(caseArg => {
                    if(!searchQuery) return true;
                    return caseArg.title?.toLowerCase().includes(searchQuery.toLowerCase())
                })
        }

        const sortedCases = newCaseList.sort((a,b) => moment(a.dateCreated).isBefore(moment(b.dateCreated)) ? 1 : -1)
        setCasesToShow(sortedCases)

    }, [cases, filters, searchQuery])

    return(
        <TableContainer component={Paper} className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="left">Title</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">User</TableCell>
                        <TableCell align="right">Date Updated</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <CaseTableRowNew />
                    {casesToShow.map((caseArg) => (
                        <CaseTableRow key={caseArg.id} caseProp={caseArg}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
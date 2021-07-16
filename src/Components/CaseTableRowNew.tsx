import React from 'react';
import {Collapse, makeStyles, TableCell, TableRow, Typography} from "@material-ui/core";
import {Case} from "../Utils/Types";
import {v4 as uuidv4} from "uuid";
import moment from "moment";
import CaseForm from "./CaseForm";

const useStyles = makeStyles({
    newCaseRow: {
        textAlign: "center",
        // padding: 20,
        cursor: "pointer",
    }
})
export default function CaseTableRowNew(): JSX.Element {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const generateNewCase = (): Case => ({
        id: uuidv4(),
        title: undefined,
        dateCreated: moment().utc().format(),
        dateUpdated: moment().utc().format(),
        caseStatus: "Created",
        notes: undefined,
        userName: "Otis"
    })

    return (
        <React.Fragment>
            <TableRow onClick={() => setOpen(!open)} >
                <TableCell colSpan={6} className={classes.newCaseRow}>
                    <Typography variant="h6">+ New Case</Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <CaseForm caseProp={generateNewCase()} setOpen={setOpen} isNew={true}/>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
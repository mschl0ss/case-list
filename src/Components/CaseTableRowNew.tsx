import React, {useContext} from 'react';
import {Button, Collapse, makeStyles, TableCell, TableRow,} from "@material-ui/core";
import {Case} from "../Utils/Types";
import {v4 as uuidv4} from "uuid";
import moment from "moment";
import CaseForm from "./CaseForm";
import {CaseRepository} from "../Server/fake-database";
import {CaseStoreContext} from "./State/CaseStore";

const useStyles = makeStyles({
    newCaseRow: {
        textAlign: "center",
        cursor: "pointer",
    }
})
export default function CaseTableRowNew(): JSX.Element {
    const classes = useStyles();
    const { saveCase } = useContext(CaseStoreContext);

    const generateUser = () => {
        const names = ["Otis", "Evey", "Willa"];
        return names[Math.floor(Math.random() * names.length)];
    }

    const generateNewCase = async (): Promise<void> => (
        await saveCase({
            id: uuidv4(),
            title: "New Case",
            dateCreated: moment().utc().format(),
            dateUpdated: moment().utc().format(),
            caseStatus: "Created",
            notes: undefined,
            userName: generateUser(),
            imageIds: []
        })
    )

    return (
        <React.Fragment>
            <TableRow onClick={generateNewCase} >
                <TableCell colSpan={6} className={classes.newCaseRow}>
                    <Button
                        variant="contained"
                    >+ New Case</Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
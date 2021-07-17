import React, {useContext} from 'react';
import {Button, makeStyles, TableCell, TableRow,} from "@material-ui/core";
import {v4 as uuidv4} from "uuid";
import moment from "moment";
import {CaseStoreContext} from "./State/CaseStore";

const useStyles = makeStyles({
    newCaseRow: {
        textAlign: "center",
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
            title: undefined,
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
            <TableRow >
                <TableCell colSpan={6} className={classes.newCaseRow}>
                    <Button
                        onClick={generateNewCase}
                        variant="contained"
                    >+ New Case</Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
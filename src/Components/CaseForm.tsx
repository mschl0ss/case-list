import React from 'react';
import {Chip, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import {CaseTableRowProps} from "./CaseTableRow";
import {CaseStatus} from "../Utils/Types";

const useStyles = makeStyles({
    root: {
        margin: "15px auto",
        padding: 15,
    },
    grow: {
        flexGrow: 1
    },
    headerRow: {
        display: 'flex'
    },
    headerRowCaseStatus: {
        width: '30%'
    },
    nextStepButtonRow: {
        margin: '5px 0'
    },
    nextStepButton: {
        cursor: 'pointer',
        margin: '0 5px 0 0'
    },
    globalNotes: {
        width: '100%',
        margin: '15px 0',
    },
    globalNotesTextField: {
        width: '100%'
    }

})
export default function CaseForm(props: CaseTableRowProps): JSX.Element {
    const {row} = props;

    const getNextAction = (caseStatus: CaseStatus): string[] => {
        switch(caseStatus) {
            case("Created"):
                return ["Submit"]
            case("Submitted"):
            case("Resubmitted"):
                return ["Approve", "Reject"];
            case("Rejected"):
                return ["Resubmit"];
            default:
                return [];
        }
    }
    const classes = useStyles();
    return(
        <div>
            <Paper elevation={1} className={classes.root}>

                <div className={classes.headerRow}>
                    <Typography variant="h6">{row.title}</Typography>
                    <div className={classes.grow} />
                    <div className={classes.headerRowCaseStatus}>
                        <div>Status: {row.caseStatus}</div>
                        <div className={classes.nextStepButtonRow}>
                            {getNextAction(row.caseStatus).map(action => (
                                <Chip
                                    key={action + Math.random()}
                                    label={action}
                                    className={classes.nextStepButton}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={classes.globalNotes}>
                    <TextField
                        className={classes.globalNotesTextField}
                        variant="outlined"
                        label="General Notes"
                        multiline
                        rows={1}
                        rowsMax={20}
                    />
                </div>
            </Paper>

        </div>
    )
}
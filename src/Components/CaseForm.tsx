import React, {useContext, useState} from 'react';
import {Chip, makeStyles, Paper, TextField} from "@material-ui/core";
import {Case, CaseStatus} from "../Utils/Types";
import {CaseStoreContext} from "./State/CaseStore";
import moment from "moment";

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

interface CaseFormProps {
    caseProp: Case,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isNew: boolean,
}
export default function CaseForm(props: CaseFormProps): JSX.Element {
    const classes = useStyles();
    const { caseProp, setOpen, isNew } = props;
    const { saveCase } = useContext(CaseStoreContext);

    const [title, setTitle] = useState<string | undefined>(caseProp.title);
    const [caseStatus, setCaseStatus] = useState<CaseStatus>(caseProp.caseStatus);
    const [notes, setNotes] = useState<string | undefined>(caseProp.notes);

    const getNextActions = (caseStatus: CaseStatus): string[] => {
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

    async function onTitleChange(newValue: string) {
        setTitle(newValue);
        if(!isNew) {
            await saveCase({
                ...caseProp,
                title: newValue,
                dateUpdated: moment.utc().format(),
            })
        }
    }

    async function onNotesChange(newValue: string) {
        setNotes(newValue);
        if(!isNew) {
            await saveCase({
                ...caseProp,
                notes: newValue,
                dateUpdated: moment.utc().format()
            })
        }
    }

    async function onCaseStatusChange(newValue: string) {
        let newCaseStatus: CaseStatus;
        switch(newValue) {
            case("Submit"):
                newCaseStatus = "Submitted";
                break;
            case("Approve"):
                newCaseStatus = "Approved";
                break;
            case("Reject"):
                newCaseStatus = "Rejected";
                break;
            case("Resubmit"):
                newCaseStatus = "Resubmitted";
                break;
            default:
                newCaseStatus = "Created"
        }
        setCaseStatus(newCaseStatus);

        await saveCase({
            ...caseProp,
            dateUpdated: moment.utc().format(),
            caseStatus: newCaseStatus,
            title,
            notes,
        })

        if(isNew) {
            setOpen(false);
        }
    }

    return(
        <div>
            <Paper elevation={2} className={classes.root}>

                <div className={classes.headerRow}>
                    <TextField
                        label="Case Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                    />
                    <div className={classes.grow} />
                    <div className={classes.headerRowCaseStatus}>
                        <div>Status: {caseStatus}</div>
                        <div className={classes.nextStepButtonRow}>
                            {getNextActions(caseStatus).map(action => (
                                <Chip
                                    key={action + Math.random()}
                                    label={action}
                                    className={classes.nextStepButton}
                                    onClick={() => onCaseStatusChange(action)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={classes.globalNotes}>
                    <TextField
                        className={classes.globalNotesTextField}
                        value={notes}
                        onChange={(e) => onNotesChange(e.target.value)}
                        variant="outlined"
                        label="General Notes"
                        multiline
                        rows={2}
                        maxRows={20}
                    />
                </div>
            </Paper>

        </div>
    )
}
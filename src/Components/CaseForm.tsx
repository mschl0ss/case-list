import React, {useState} from 'react';
import {Chip, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import {Case, CaseStatus} from "../Utils/Types";

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
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function CaseForm(props: CaseFormProps): JSX.Element {
    const classes = useStyles();
    const { caseProp } = props;
    // const {
    //     id,
    //     title,
    //     caseStatus,
    //     dateCreated,
    //     dateUpdated,
    //     notes,
    //     userName
    // } = props.caseProp;

    const [title, setTitle] = useState<string>(caseProp.title);
    const [caseStatus, setCaseStatus] = useState<CaseStatus>(caseProp.caseStatus);
    const [notes, setNotes] = useState<string>(caseProp.notes);

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

    function onTitleChange(newValue: string) {
        setTitle(newValue);
    }

    function onCaseStatusChange(newValue: string) {
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
    }

    return(
        <div>
            <Paper elevation={1} className={classes.root}>

                <div className={classes.headerRow}>
                    <TextField
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                    />
                    <div className={classes.grow} />
                    <div className={classes.headerRowCaseStatus}>
                        <div>Status: {caseStatus}</div>
                        <div className={classes.nextStepButtonRow}>
                            {getNextAction(caseStatus).map(action => (
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
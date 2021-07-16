import React from 'react';
import {Chip, makeStyles} from "@material-ui/core";
import {blue, green, red} from "@material-ui/core/colors";
import {CaseStatus, CaseStatusAction} from "../Utils/Types";

const useStyles = makeStyles({
    chip: {
    },
    blueChip: {
        backgroundColor: blue["300"],
        color: "white",
    },
    greenChip: {
        backgroundColor: green["300"],
        color: "white",
    },
    redChip: {
        backgroundColor: red["300"],
        color: "white",
    }
});

export function StatusChip(props: {caseStatusOrAction: CaseStatus | CaseStatusAction}): JSX.Element {
    const classes = useStyles();
    const { caseStatusOrAction } = props;

    const getStatusColor = (chipText: CaseStatus | CaseStatusAction): string => {
        switch(chipText) {
            case("Created"):
                return classes.chip;
            case("Submit"):
            case("Submitted"):
            case("Resubmit"):
            case("Resubmitted"):
                return classes.blueChip;
            case("Approve"):
            case("Approved"):
                return classes.greenChip;
            case("Reject"):
            case("Rejected"):
                return classes.redChip;
            default:
                return classes.chip;
        }
    }

    return(
        <Chip
            label={caseStatusOrAction}
            className={getStatusColor(caseStatusOrAction)}
        />
    )

}
import React from 'react';
import {Chip, makeStyles} from "@material-ui/core";
import {blue, green, red} from "@material-ui/core/colors";
import {CaseStatus} from "../Utils/Types";

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

export function StatusChip(props: {caseStatus: CaseStatus}): JSX.Element {
    const classes = useStyles();
    const { caseStatus } = props;

    const getStatusColor = (status: CaseStatus ): string => {
        switch(status) {
            case("Created"):
                return classes.chip;
            case("Submitted"):
            case("Resubmitted"):
                return classes.blueChip;
            case("Approved"):
                return classes.greenChip;
            case("Rejected"):
                return classes.redChip;
            default:
                return classes.chip;
        }
    }

    return(
        <Chip
            label={caseStatus}
            className={getStatusColor(caseStatus)}
        />
    )

}
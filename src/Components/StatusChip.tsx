import React from 'react';
import {Chip, makeStyles} from "@material-ui/core";
import {blue, green, orange, red} from "@material-ui/core/colors";
import {CaseStatus} from "../Utils/Types";
import clsx from "clsx";

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
    },
    orangeChip: {
        backgroundColor: orange["300"],
        color: "white",
    },
    chipStyles: {
        cursor: 'pointer',
        minWidth: 100,
    }
});

export function StatusChip(props: {caseStatus: CaseStatus}): JSX.Element {
    const classes = useStyles();
    const { caseStatus } = props;

    const getStatusColor = (status: CaseStatus ): string => {
        switch(status) {
            case("Created"):
                return clsx(classes.orangeChip, classes.chipStyles);
            case("Submitted"):
            case("Resubmitted"):
                return clsx(classes.blueChip, classes.chipStyles);
            case("Approved"):
                return clsx(classes.greenChip, classes.chipStyles);
            case("Rejected"):
                return clsx(classes.redChip, classes.chipStyles);
            default:
                return clsx(classes.chip, classes.chipStyles);
        }
    }

    return(
        <Chip
            label={caseStatus}
            className={getStatusColor(caseStatus)}
        />
    )

}
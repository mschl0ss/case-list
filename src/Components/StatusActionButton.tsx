import React from 'react';
import {Button, makeStyles} from "@material-ui/core";
import {blue, green, red} from "@material-ui/core/colors";
import {CaseStatusAction} from "../Utils/Types";
import clsx from "clsx";

const useStyles = makeStyles({
    chip: {
    },
    blueChip: {
        backgroundColor: blue["500"],
        color: "white",
    },
    greenChip: {
        backgroundColor: green["500"],
        color: "white",
    },
    redChip: {
        backgroundColor: red["500"],
        color: "white",
    },
    nextStepButton: {
        margin: '0 5px 0 0',
        minWidth: 95
    },
});

interface StatusActionButtonProps {
    caseStatusAction: CaseStatusAction,
    onClick: (newValue: CaseStatusAction) => Promise<void>,
}
export function StatusActionButton(props: StatusActionButtonProps): JSX.Element {
    const classes = useStyles();
    const { caseStatusAction, onClick } = props;

    function getStatusColor(): string {
        let style;
        switch(caseStatusAction) {
            case("Submit"):
            case("Resubmit"):
                style = classes.blueChip;
                break;
            case("Approve"):
                style = classes.greenChip;
                break;
            case("Reject"):
                style = classes.redChip;
                break;
            default:
                style = classes.chip;
                break;
        }
        return clsx(style, classes.nextStepButton)
    }
    const css = getStatusColor();
    return (
        <Button
            size="small"
            variant="contained"
            onClick={() => onClick(caseStatusAction)}
            className={css}
        >
            {caseStatusAction}
        </Button>
    )
}
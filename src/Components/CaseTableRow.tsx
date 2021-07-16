import React from 'react';
import {CaseStatus} from "../Utils/Types";
import {Moment} from "moment";
import {Chip, IconButton, makeStyles, TableCell, TableRow} from "@material-ui/core";
import {blue, green} from "@material-ui/core/colors";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";


const useStyles = makeStyles({
    root: {
        cursor: "pointer",
    },
    chip: {
    },
    blueChip: {
        backgroundColor: blue["300"],
        color: "white",
    },
    greenChip: {
        backgroundColor: green["300"],
        color: "white",
    }
});

interface CaseTableRowProps {
    row: {title: string, caseStatus: CaseStatus, date: Moment, name: string}
}

export default function CaseTableRow(props: CaseTableRowProps): JSX.Element {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const { row } = props;

    const getStatusColor = (caseStatus: CaseStatus): string => {
        switch(caseStatus) {
            case("Created"):
                return classes.chip;
            case("Submitted"):
                return classes.blueChip;
            case("Approved"):
                return classes.greenChip;
            default:
                return classes.chip;
        }
    }

    return (
        <TableRow key={row.title} className={classes.root} onClick={() => setOpen(!open)}>
            <TableCell align="left">
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {row.title}
            </TableCell>
            <TableCell align="center">
                <Chip
                    label={row.caseStatus}
                    className={getStatusColor(row.caseStatus)}
                />
            </TableCell>
            <TableCell align="right">{row.name}</TableCell>
            <TableCell align="right">{row.date.format()}</TableCell>
        </TableRow>
    )
}
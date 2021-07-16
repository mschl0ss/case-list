import React from 'react';
import {Case, CaseStatus} from "../Utils/Types";
import {Moment} from "moment";
import {Chip, Collapse, IconButton, makeStyles, TableCell, TableRow} from "@material-ui/core";
import {blue, green} from "@material-ui/core/colors";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CaseForm from "./CaseForm";


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

export interface CaseTableRowProps {
    caseProp: Case
}

export default function CaseTableRow(props: CaseTableRowProps): JSX.Element {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const {
        title,
        caseStatus,
        userName,
        dateUpdated
    } = props.caseProp;

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
        <React.Fragment>
            <TableRow key={title} className={classes.root} onClick={() => setOpen(!open)}>
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
                    {title}
                </TableCell>
                <TableCell align="center">
                    <Chip
                        label={caseStatus}
                        className={getStatusColor(caseStatus)}
                    />
                </TableCell>
                <TableCell align="right">{userName}</TableCell>
                <TableCell align="right">{dateUpdated.format()}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <CaseForm caseProp={props.caseProp} setOpen={setOpen}/>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
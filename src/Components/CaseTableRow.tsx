import React, {useContext, useEffect, useState} from 'react';
import {Case} from "../Utils/Types";
import {Collapse, IconButton, makeStyles, TableCell, TableRow} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CaseForm from "./CaseForm";
import {StatusChip} from "./StatusChip";
import {CaseStoreContext} from "./State/CaseStore";
import moment from "moment";

const useStyles = makeStyles({
    root: {
        cursor: "pointer",
    },
    titleCell: {
        minWidth: 100,
        maxWidth: 100,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    collapseCell: {
        paddingBottom: 0,
        paddingTop: 0,
        backgroundColor: "#fafafa"
    }
});

export interface CaseTableRowProps {
    caseProp: Case
}

export default function CaseTableRow(props: CaseTableRowProps): JSX.Element {
    const classes = useStyles();
    const { saveCase } = useContext(CaseStoreContext);
    const [rowCase, _setRowCase] = useState<Case>(props.caseProp);
    const [open, setOpen] = useState(false);
    const {
        title,
        caseStatus,
        userName,
        dateUpdated
    } = rowCase;

    useEffect(() => {
        if(
            !moment(rowCase.dateCreated).isBefore(moment.utc().subtract(1, 'seconds'))
            && !open
        ) {
            setOpen(true);
        }
    }, [open, rowCase.dateCreated])

    async function setRowCase(caseArg: Case) {
        await saveCase(caseArg);
        _setRowCase(caseArg);
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
                <TableCell component="th" scope="row" className={classes.titleCell} align="left">
                    {title}
                </TableCell>
                <TableCell align="center">
                    <StatusChip caseStatus={caseStatus} />
                </TableCell>
                <TableCell align="center">{userName}</TableCell>
                <TableCell align="right">{moment(dateUpdated).format("ddd, h:mm:ss a")}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={classes.collapseCell} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <CaseForm
                            caseProp={rowCase}
                            setRowCase={setRowCase}
                        />
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
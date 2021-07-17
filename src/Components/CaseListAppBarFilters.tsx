import React, {useContext} from 'react';
import FilterListIcon from "@material-ui/icons/FilterList";
import {Button, Chip, makeStyles, Typography} from "@material-ui/core";
import {CaseStatus, CaseStatusAction, CaseStatuses} from "../Utils/Types";
import {CaseStoreContext} from "./State/CaseStore";
import {blue, green, grey, orange, red} from "@material-ui/core/colors";
import clsx from "clsx";

const useStyles = makeStyles({
    root: {
        margin: '15px auto',
        minWidth: 650,
        maxWidth: 900,
        display: 'flex',
        justifyContent: 'space-between'
    },
    chip: {
      // margin: '0 20px 0 0',
    },
    inactiveChip: {
        background: grey["500"],
    },
    whiteChip: {
        backgroundColor: 'white',
    },
    orangeChip: {
        backgroundColor: orange["300"],
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
})
export default function CaseListAppBarFilters(): JSX.Element {
    const classes = useStyles();
    const { filters, setFilters, clearFilters } = useContext(CaseStoreContext);

    const getStatusColor = (chipText: CaseStatus | CaseStatusAction): string => {
        switch(chipText) {
            case("Created"):
                return classes.orangeChip;
            case("Submitted"):
            case("Resubmitted"):
                return classes.blueChip;
            case("Approved"):
                return classes.greenChip;
            case("Rejected"):
                return classes.redChip;
            default:
                return classes.inactiveChip;
        }
    }

    const filterButtonDetails = CaseStatuses.map(caseStatus => {
        const isActiveFilter = filters.includes(caseStatus);
        return {
            label: caseStatus,
            css: clsx(
                isActiveFilter ? getStatusColor(caseStatus) : classes.inactiveChip,
                classes.chip
                ),
            onClick: () => setFilters(caseStatus, !isActiveFilter),
        }
    })

    return(
        <div className={classes.root}>
            <Typography variant="h6">Filters</Typography>
            <Button
                size="small"
                variant="contained"
                startIcon={<FilterListIcon />}
                onClick={clearFilters}
                className={classes.whiteChip}
            >
                Clear Filters
            </Button>
            {filterButtonDetails.map(details => (
                <Button
                    size="small"
                    variant="contained"
                    startIcon={<FilterListIcon />}
                    onClick={details.onClick}
                    className={details.css}
                >
                    {details.label}
                </Button>
            ))}
        </div>
    )
}
import React from 'react';
import {makeStyles} from "@material-ui/core";
import CaseTable from "./CaseTable";
import CaseListAppBar from "./CaseListAppBar";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function MainPage(): JSX.Element {

    const classes = useStyles();

    return(
        <div className={classes.root}>

            <CaseListAppBar />
            <CaseTable/>
        </div>
    )

}
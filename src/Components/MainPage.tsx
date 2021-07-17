import React from 'react';
import {makeStyles} from "@material-ui/core";
import CaseTable from "./CaseTable";
import CaseListAppBar from "./CaseListAppBar";
import {CaseStoreProvider} from "./State/CaseStore";
import CaseListAppBarFilters from "./CaseListAppBarFilters";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 1024,
        margin: '0 auto',
        minHeight: '100vh',
        backgroundColor: '#fafafa'
    },

});

export default function MainPage(): JSX.Element {

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <CaseStoreProvider>
                <CaseListAppBar />
                <CaseListAppBarFilters />
                <CaseTable/>
            </CaseStoreProvider>
        </div>
    )

}
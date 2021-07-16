import React from 'react';
import {AppBar, IconButton, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1
    }
}))

export default function MainPage(): JSX.Element {

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Case List
                    </Typography>
                    <div className={classes.grow} />
                    <div aria-label="app-bar-buttons">
                        <IconButton
                            edge="end"
                            color="inherit"
                            >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )

}
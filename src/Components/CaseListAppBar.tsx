import React from 'react';
import {
    alpha,
    AppBar,
    IconButton,
    InputBase,
    makeStyles,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {AccountCircle} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function CaseListAppBar(): JSX.Element {

    const classes = useStyles();

    return(
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Case List
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search or Filter…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
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
    )
}
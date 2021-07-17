import React from 'react';
import {Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
    }
});

interface CaseFormPhotoUploadProps {
    widget: any,
}

export default function CaseFormPhotoUpload(props: CaseFormPhotoUploadProps): JSX.Element {
    const { widget } = props;
    const classes = useStyles();

    function showWidget() {
        widget.open();
    }
    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                onClick={showWidget}
            >Upload Photo</Button>
        </div>
    )
}
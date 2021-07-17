import React from 'react';
import {Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
    }
});

export default function CaseFormPhotoUpload(): JSX.Element {
    const classes = useStyles();

    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget({
        cloudName: "dkyipbwc4",
        uploadPreset: "momcakbh" },
        (error: any, result: any) => { checkUploadResult(result)})

    const checkUploadResult = (resultEvent: any) => {
        if(resultEvent.event === 'success') {
            console.log('resultEvent: ', resultEvent)
            console.log('url to photo: ', resultEvent.info.secure_url)
        }
    }

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

/*
result event:
event: "success"
info:
    asset_id: "5186293c67e4806229d43ba16824a41d"
    batchId: "uw-batch2"
    bytes: 51525
    created_at: "2021-07-17T13:13:19Z"
    etag: "65ff00d1c2447f23d0302c0d2b8b585a"
    existing: false
    format: "png"
    height: 392
    id: "uw-file3"
    original_filename: "Screen Shot 2021-07-17 at 8.47.55 AM"
    path: "v1626527599/Screen_Shot_2021-07-17_at_8.47.55_AM_ymdagg.png"
    placeholder: false
    public_id: "Screen_Shot_2021-07-17_at_8.47.55_AM_ymdagg"
    resource_type: "image"
    secure_url: "https://res.cloudinary.com/dkyipbwc4/image/upload/v1626527599/Screen_Shot_2021-07-17_at_8.47.55_AM_ymdagg.png"
    signature: "12d08353799a620cc7248569a04cef61b255c84d"
    tags: []
    thumbnail_url: "https://res.cloudinary.com/dkyipbwc4/image/upload/c_limit,h_60,w_90/v1626527599/Screen_Shot_2021-07-17_at_8.47.55_AM_ymdagg.png"
    type: "upload"
    url: "http://res.cloudinary.com/dkyipbwc4/image/upload/v1626527599/Screen_Shot_2021-07-17_at_8.47.55_AM_ymdagg.png"
    version: 1626527599
    version_id: "192f52e3e8c0eec959b76719e48ee15c"
    width: 417
 */
import React, {useContext} from 'react';
import {Button, makeStyles} from "@material-ui/core";
import {v4 as uuidv4} from "uuid";
import {Case} from "../Utils/Types";
import {CaseImageRepository} from "../Server/fake-database";
import moment from "moment";
import {CaseStoreContext} from "./State/CaseStore";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
    }
});

interface CaseFormPhotoUploadProps {
    caseProp: Case,
    onCaseImageUpload: (caseImageId: string) => void;
}

export default function CaseFormPhotoUpload(props: CaseFormPhotoUploadProps): JSX.Element {
    const { onCaseImageUpload } = props;
    const classes = useStyles();

    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget({
        cloudName: "dkyipbwc4",
        uploadPreset: "momcakbh" },
        (error: any, result: any) => { checkUploadResult(result)})

    const checkUploadResult = async (resultEvent: any) => {
        if(resultEvent.event === 'success') {
            const newImageId = uuidv4();
            await CaseImageRepository.save({
                id: newImageId,
                dateUploaded: moment.utc().format(),
                url: resultEvent.info.secure_url,
                thumbnailUrl: resultEvent.info.thumbnail_url,
                annotationData: [],
            });
            onCaseImageUpload(newImageId);
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
import React, {useEffect, useState} from 'react';
import {Box, makeStyles, Paper, TextField} from "@material-ui/core";
import {Case, CaseImage, CaseStatus, CaseStatusAction} from "../Utils/Types";
import moment from "moment";
import {StatusActionButton} from "./StatusActionButton";
import CaseFormPhotoUpload from "./CaseFormPhotoUpload";
import {CaseImageRepository} from "../Server/fake-database";
import CaseImageForm from "./CaseImageForm";
import {v4 as uuidv4} from "uuid";

const useStyles = makeStyles({
    root: {
        margin: "15px auto",
        padding: 15,
    },
    grow: {
        flexGrow: 1
    },
    headerRow: {
        display: 'flex'
    },
    headerRowCaseStatus: {
        width: '30%'
    },
    nextStepButtonRow: {
        margin: '5px 0'
    },
    nextStepButton: {
        cursor: 'pointer',
        margin: '0 5px 0 0'
    },
    globalNotes: {
        width: '100%',
        margin: '15px 0',
    },
    globalNotesTextField: {
        width: '100%'
    },
    inline: {
        display: 'inline'
    }

})

interface CaseFormProps {
    caseProp: Case,
    setRowCase: (caseArg: Case) => void
}
export default function CaseForm(props: CaseFormProps): JSX.Element {
    const classes = useStyles();
    const { caseProp, setRowCase } = props;

    const [title, setTitle] = useState<string | undefined>(caseProp.title);
    const [notes, setNotes] = useState<string | undefined>(caseProp.notes);
    const [caseImageIds, setCaseImageIds] = useState<string[]>(caseProp.imageIds);
    const [caseImages, setCaseImages] = useState<CaseImage[]>([]);

    useEffect(() => {
        async function getCaseImages() {
            const fetchedImages = await CaseImageRepository.findMany(caseImageIds)
            setCaseImages(fetchedImages)
        }

        getCaseImages();
    }, [caseImageIds])

    const getNextActions = (caseStatus: CaseStatus): CaseStatusAction[] => {
        switch(caseStatus) {
            case("Created"):
                return ["Submit"]
            case("Submitted"):
            case("Resubmitted"):
                return ["Approve", "Reject"];
            case("Rejected"):
                return ["Resubmit"];
            default:
                return [];
        }
    }
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
                height: resultEvent.info.height,
                width: resultEvent.info.width,
            });
            onCaseImageUpload(newImageId);
        }
    }

    async function onCaseImageUpload(caseImageId: string) {
        const newImageIds = caseImageIds.concat(caseImageId);
        setCaseImageIds(newImageIds);
        await setRowCase({
            ...caseProp,
            imageIds: newImageIds
        })
    }

    async function onTitleChange(newValue: string) {
        setTitle(newValue);
        await setRowCase({
            ...caseProp,
            title: newValue,
            dateUpdated: moment.utc().format(),
        })
    }

    async function onNotesChange(newValue: string) {
        setNotes(newValue);
        await setRowCase({
            ...caseProp,
            notes: newValue,
            dateUpdated: moment.utc().format()
        })

    }

    async function onCaseStatusChange(newValue: CaseStatusAction) {
        let newCaseStatus: CaseStatus;
        switch(newValue) {
            case("Submit"):
                newCaseStatus = "Submitted";
                break;
            case("Approve"):
                newCaseStatus = "Approved";
                break;
            case("Reject"):
                newCaseStatus = "Rejected";
                break;
            case("Resubmit"):
                newCaseStatus = "Resubmitted";
                break;
            default:
                newCaseStatus = "Created"
        }

        await setRowCase({
            ...caseProp,
            dateUpdated: moment.utc().format(),
            caseStatus: newCaseStatus,
            title,
            notes,
        })

    }

    return(
        <div>
            <Paper elevation={2} className={classes.root}>

                <div className={classes.headerRow}>
                    <TextField
                        label="Case Title"
                        variant="outlined"
                        value={title || ''}
                        onChange={(e) => onTitleChange(e.target.value)}
                    />
                    <CaseFormPhotoUpload widget={widget} />
                    <div className={classes.headerRowCaseStatus}>
                        <div>
                            <span>Status:&nbsp;</span>
                            <Box fontWeight={800} className={classes.inline}>{caseProp.caseStatus}</Box>
                        </div>
                        <div className={classes.nextStepButtonRow}>
                            {getNextActions(caseProp.caseStatus).map(action => (
                                <StatusActionButton
                                    key={action + Math.random()}
                                    caseStatusAction={action}
                                    onClick={onCaseStatusChange}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={classes.globalNotes}>
                    <TextField
                        className={classes.globalNotesTextField}
                        value={notes}
                        onChange={(e) => onNotesChange(e.target.value)}
                        variant="outlined"
                        label="General Notes"
                        multiline
                        maxRows={10}
                    />
                </div>
                {caseImages.map(caseImage => (
                    <CaseImageForm key={caseImage.id} caseImageProp={caseImage} />
                ))}

            </Paper>

        </div>
    )
}
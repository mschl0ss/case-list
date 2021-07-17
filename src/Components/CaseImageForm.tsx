import React, {useEffect} from 'react';
import {CaseImage} from "../Utils/Types";
import {makeStyles, TextField} from "@material-ui/core";
import {ReactPictureAnnotation} from "react-picture-annotation";
import {IAnnotation} from "react-picture-annotation/dist/types/src/Annotation";
import {CaseImageRepository} from "../Server/fake-database";

const useStyles = makeStyles({
    root: {
        margin: '15px 0',
        padding: '15px 15px 0 15px',
        display: 'flex',
        borderTop: 'solid 1px #DFE0E0',
        maxWidth: '100%',
        minHeight: 850
    },
})
interface CaseImageFormProps {
    caseImage: CaseImage
}

export default function CaseImageForm(props: CaseImageFormProps): JSX.Element {
    const classes = useStyles();

    const { caseImage } = props;

    const onChange = async (data: IAnnotation[]) => {
        CaseImageRepository.save({
            ...caseImage,
            annotationData: data
        })
    }
    const onSelect = (selectedId: string | null) => null;

    return(
        <div className={classes.root}>
            <ReactPictureAnnotation
                onChange={onChange}
                width={800}
                height={800}
                image={caseImage.url}
                onSelect={onSelect}
                scrollSpeed={0}
                annotationData={caseImage.annotationData}
            />
        </div>
    )
}
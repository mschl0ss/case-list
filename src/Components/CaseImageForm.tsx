import React, {useEffect, useState} from 'react';
import {CaseImage} from "../Utils/Types";
import {makeStyles} from "@material-ui/core";
import {ReactPictureAnnotation} from "react-picture-annotation";
import {IAnnotation} from "react-picture-annotation/dist/types/src/Annotation";
import {CaseImageRepository} from "../Server/fake-database";

const useStyles = makeStyles({
    root: {
        margin: '15px auto',
        padding: '15px',
        display: 'flex',
        borderTop: 'solid 1px #DFE0E0',
        maxWidth: '100%',
        minHeight: 800
    },
})
interface CaseImageFormProps {
    caseImageProp: CaseImage
}

export default function CaseImageForm(props: CaseImageFormProps): JSX.Element {
    const classes = useStyles();
    const { caseImageProp } = props;
    const [caseImage, setCaseImage] = useState<CaseImage>(props.caseImageProp);

    const ratio = calculateAspectRatio(caseImageProp.width, caseImageProp.height, 800 ,800)
    function calculateAspectRatio(
        srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number
    ) {
        return Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    }

    useEffect(() => {
        async function saveImage() {
            await CaseImageRepository.save({
                ...caseImage,
                annotationData: caseImage.annotationData
            });
        }

        saveImage();
    }, [caseImage]);

    const onChange = async (data: IAnnotation[]) => {
        setCaseImage({
            ...caseImage,
            annotationData: data,
        })
    }

    return(
        <div className={classes.root} style={{minHeight: caseImageProp.height * 1.05 * ratio}}>
            <ReactPictureAnnotation
                onChange={onChange}
                width={caseImageProp.width * ratio}
                height={caseImageProp.height * ratio}
                image={caseImageProp.url}
                onSelect={() => null}
                scrollSpeed={0}
                annotationData={caseImage.annotationData}
            />
        </div>

    )
}
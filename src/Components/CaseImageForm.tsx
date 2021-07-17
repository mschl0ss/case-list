import React, {useEffect} from 'react';
import {CaseImage} from "../Utils/Types";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        margin: '15px 0',
        paddingTop: 15,
        display: 'flex',
        borderTop: 'solid 1px #DFE0E0'
    },
    media: {
        maxWidth: '50%',
        height: 'auto',
        width: 'auto'
    },
})
interface CaseImageFormProps {
    caseImage: CaseImage
}

export default function CaseImageForm(props: CaseImageFormProps): JSX.Element {
    const classes = useStyles();

    const { caseImage } = props;

    useEffect(() => {
        console.log('caseImageForm caseImage', caseImage)
    }, [caseImage])

    return(
        <div className={classes.root}>
            <img src={caseImage.url} className={classes.media}/>
        </div>
    )
}
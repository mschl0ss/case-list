import {Moment} from "moment";
import {IAnnotation} from "react-picture-annotation/dist/types/src/Annotation";

export const CaseStatuses: CaseStatus[] = ["Created", "Submitted", "Resubmitted", "Approved", "Rejected"]
export type CaseStatus = "Created" | "Submitted" | "Resubmitted" | "Approved" | "Rejected";
export type CaseStatusAction = "Submit" | "Approve" | "Reject" | "Resubmit";

export type UserRole = "User" | "Manager";

export interface User {
    id?: string,
    firstName: string,
    lastName: string,
    userRole: UserRole
}

export interface Case {
    id: string,
    title?: string,
    dateCreated: Moment | string,
    dateUpdated: Moment | string,
    caseStatus: CaseStatus,
    notes?: string,
    userName: string,
    imageIds: string[]
}

export interface CaseImage {
    id: string,
    dateUploaded: string,
    url: string,
    thumbnailUrl: string,
    annotationData: IAnnotation[],
    height: number,
    width: number,
}
import {Moment} from "moment";

export type CaseStatus = "Created" | "Submitted" | "Resubmitted" | "Approved" | "Rejected"

export type UserRole = "User" | "Manager";

export interface User {
    id?: string,
    firstName: string,
    lastName: string,
    userRole: UserRole
}

export interface Case {
    id?: number,
    title: string,
    dateCreated: Moment,
    dateUpdated: Moment,
    caseStatus: CaseStatus,
    notes: string,
    userName: string,
}

export interface CaseImage {
    id?: number,
    location: string,
    caseId: number,
    notes: string
}
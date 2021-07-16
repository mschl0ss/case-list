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
    caseStatus: CaseStatus,
    notes: string,
    userId: number,
    managerId: number
}

export interface CaseImage {
    id?: number,
    location: string,
    caseId: number,
    notes: string
}
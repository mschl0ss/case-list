export type CaseStatus = "Created" | "Submitted" | "Resubmitted" | "Approved" | "Rejected"

export type UserRole = "User" | "Manager";

export interface User {
    firstName: string,
    lastName: string,
    userRole: UserRole
}
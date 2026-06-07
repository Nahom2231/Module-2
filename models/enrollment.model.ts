import{ Temporal } from "@js-temporal/polyfill";

export interface EnrollmentRecord {
    readonly studentid: string;
     readonly courseCode: string;
    enrolledAt: Temporal.Instant;

}
import {Temporal} from "@js-temporal/polyfill";

export interface Course {
    readonly id: string;
    title: string;
    capacity: number;
    startDate?: Temporal.PlainDate;
}

export type CourseStatus = 
  | { status: "DRAFT"; createdBy: string; createdAt: Temporal.Instant } 
  | { status: "PUBLISHED"; publishedAt: Temporal.Instant; syllabus: string } 
  | { 
      status: "ACTIVE";       enrolledCount: number; 
      startDate: Temporal.PlainDate; 
    }   | { 
      status: "ARCHIVED";       archivedAt: Temporal.Instant; 
      finalEnrollmentCount: number; 
    } 
  | { status: "CANCELLED"; reason: string; cancelledAt: Temporal.Instant }; 

  export function describeCourse(status: CourseStatus): string {
  switch (status.status) {
    case "DRAFT":
      return `The course is currently a draft, created by ${status.createdBy} on ${status.createdAt.toString()}.`;
    
    // 👇 Double-check this entire block has the 'return'
    case "PUBLISHED":
      return `The course has been published. Syllabus: ${status.syllabus}`;
    
    case "ACTIVE":
     return `The course is actively running with ${status.enrolledCount} students enrolled. It started on ${status.startDate.toString()}.`;
    
    case "ARCHIVED":
      return `The course has been archived. It concluded with a final enrollment of ${status.finalEnrollmentCount} students.`;
    
    case "CANCELLED":
      return `The course was cancelled on ${status.cancelledAt.toString()} for the following reason: ${status.reason}`;
    
    default: {
      const _exhaustiveCheck: never = status;
      return _exhaustiveCheck;
    }
  }
}
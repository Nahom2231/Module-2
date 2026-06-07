import { Temporal } from "@js-temporal/polyfill"; 
 
export type ApiResponse<T> = 
  | { status: "loading" } 
  | { status: "success"; data: T; fetchedAt: Temporal.Instant } 
  | { status: "error"; message: string; statusCode: number }; 
     export function renderResponse<T>(   response: ApiResponse<T>,   formatter: (data: T) => string, 
): string { 
       switch (response.status) {
    case "loading":
      return "Loading...";
    
    case "success":
      // Because we matched "success", TypeScript knows response.data exists and is type T
      return formatter(response.data);
    
    case "error":
      return `Error ${response.statusCode}: ${response.message}`;
    
    default: {
      // The same trusty exhaustiveness check to ensure all API states are handled!
      const _exhaustiveCheck: never = response;
      return _exhaustiveCheck;
    }
  }
}
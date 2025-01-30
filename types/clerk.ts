declare module '@clerk/nextjs' {
    interface ClerkAPIError {
      longMessage: string;
      code: string;
    }
  
    interface ClerkAPIResponse {
      errors: ClerkAPIError[];
    }
  }
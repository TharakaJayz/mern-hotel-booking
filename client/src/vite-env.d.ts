/// <reference types="vite/client" />

declare global {
    const importMeta: ImportMeta & { env: ImportMetaEnvironment };
  }
  
  interface ImportMetaEnvironment {
    readonly VITE_API_BASE_URL: string;
    // Add other environment variables here
  }
  
  export {};
/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_NEWS_API_KEY: string | undefined;
  VITE_API_BASE_URL: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

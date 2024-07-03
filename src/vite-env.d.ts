/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_NEWS_API_KEY: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

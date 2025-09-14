/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RAKUTEN_APP_ID: string;
  readonly VITE_RAKUTEN_BASE_URL: string;
  readonly VITE_RAKUTEN_APP_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

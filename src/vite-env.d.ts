/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEBUG_API: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

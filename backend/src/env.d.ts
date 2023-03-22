declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_USERNAME: string;
    REDIS_PASSWORD: string;
    GCM_API_KEY: string;
    VAPID_PUBLIC_KEY: string;
    VAPID_PRIVATE_KEY: string;

    VAPID_MAIL_TO: string;
    DATABASE_URL: string; //postgres:pass123@localhost:5432/postgres
  }
}

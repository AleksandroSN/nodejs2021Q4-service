export interface AppConfig {
  PORT: string | number;
  BASE_HOST: string;
  USE_FASTIFY: string;
  JWT_SECRET_KEY: string;
  LOG_LEVEL: string;
}

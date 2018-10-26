export enum Environment {
  LOCAL = 'LOCAL',
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION',
}

export type IConfig = {
  ENV: Environment;
  PROJECT_NAME: string;
  API_HOST: string;
}
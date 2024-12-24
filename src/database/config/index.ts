import { getEnv, loadEnv } from '../../utils';
import { LoggerOptions, LogLevel } from 'typeorm';

loadEnv();
//
// DB_LOGGING=all node node_modules/typeorm/cli.js migration:run -d node_modules/@scaletech/backend-database/dist/connection/index.js
export const databaseConf = {
  DB_TYPE: () => getEnv('DB_TYPE', 'postgres') as any,

  DB_HOST: () => getEnv('DB_HOST', 'localhost'),

  DB_PORT: () => parseInt(getEnv('DB_PORT', '5432')),

  DB_USERNAME: () => getEnv('DB_USERNAME', 'postgres'),

  DB_PASSWORD: () => getEnv('DB_PASSWORD', 'password'),

  DB_NAME: () => getEnv('DB_NAME', 'backend'),

  LOG_LEVEL: () => getEnv('DB_LOG_LEVEL', 'debug') as LogLevel,

  DB_LOG_NOTIFICATION: () => getEnv('DB_LOG_NOTIFICATION', 'false') === 'true',

  DB_SSL: () => getEnv('DB_SSL', 'false') === 'true',

  DB_OPTIONS: (): LoggerOptions => {
    const shouldDbLog = getEnv('DB_LOGGING', databaseConf.LOG_LEVEL());

    if (shouldDbLog == 'false' || shouldDbLog == 'true') {
      return shouldDbLog == 'true';
    }

    if (shouldDbLog === 'all') {
      return shouldDbLog;
    }

    return shouldDbLog.split(',').map((v: any) => v.trim()) as LoggerOptions;
  },
};

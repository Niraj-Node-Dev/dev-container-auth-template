import { databaseConf } from '../config/index';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const entityFolder = path.join(
  __dirname,
  '../entity/**/*.entity.{ts,js}',
);

export const migrationFolder = path.join(
  __dirname,
  '../migrations/**/*.{ts,js}',
);

export const seedsFolder = path.join(__dirname, '../seeds/**/*.{ts,js}');

export const ormConfig: DataSourceOptions = {
  replication: {
    master: {
      host: databaseConf.DB_HOST(),
      port: databaseConf.DB_PORT(),
      username: databaseConf.DB_USERNAME(),
      password: databaseConf.DB_PASSWORD(),
      database: databaseConf.DB_NAME(),
    },
    slaves: [],
  },
  type: databaseConf.DB_TYPE(),
  entities: [entityFolder],
  migrations: [migrationFolder],
  migrationsTableName: 'migrations',
  logging: databaseConf.DB_OPTIONS(),
  extra: {
    ssl: databaseConf.DB_SSL()
      ? {
          rejectUnauthorized: false,
        }
      : undefined,
  },
};

export const AppDataSource = new DataSource(ormConfig);

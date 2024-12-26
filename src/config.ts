import { getEnv, loadEnv } from './utils';

loadEnv();

export const VERSION = getEnv('VERSION', 'local');
export const BUILDTIME = getEnv('BUILDTIME', Date.now().toString());
export const REVISION = getEnv('REVISION', 'local');

export const PORT = +getEnv('PORT', '7007');
export const HOST = getEnv('HOST', '0.0.0.0');
export const API_GATEWAY = getEnv('API_GATEWAY', `http://${HOST}:${PORT}`);

export const SWAGGER_DOC_ENDPOINT = getEnv('SWAGGER_DOC_ENDPOINT', 'api-doc');

export const JWT_SALT = getEnv('JWT_SALT', 'secret');
export const JWT_EXPIRES = getEnv('JWT_EXPIRES', '10000');
export const APP_NAME = getEnv('APP_NAME', 'demo');
export const APP_ENV = getEnv('APP_ENV', 'local');

export const DEFAULT_USER_ROLE = getEnv('DEFAULT_USER_ROLE', 'NORMAL');

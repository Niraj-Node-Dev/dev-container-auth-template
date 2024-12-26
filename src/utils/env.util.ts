import * as fs from 'fs';

export const getEnv = (name: string, def = ''): string => {
    const upperName = name.toUpperCase();
    const env = process.env[upperName] ?? def;
    if (!env) {
        throw new Error(`in .env file '${upperName}' not found.`);
    }
    return env;
};

export const envFile = () =>
    process.env['APP_ENV_FILE_PATH'] ?? `${process.env['INIT_CWD']}/.env`;

/**
 * It will load the .env file and set the environment variables
 * @param stage {IAvailableEnv}
 */
export const loadEnv = () => {
    const envFilePath = envFile();

    if (!fs.existsSync(envFilePath)) {
        console.error(`${envFilePath} does not exist.`);
    }
    console.log(`Loading ${envFilePath}`);
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
    require('dotenv').config({ path: envFilePath, override: true });
};

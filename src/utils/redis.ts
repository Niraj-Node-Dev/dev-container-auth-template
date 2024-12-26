import Redis, { RedisOptions } from 'ioredis';
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USERNAME } from '../config';

const redisConf: RedisOptions = {
    port: REDIS_PORT,
    host: REDIS_HOST,
};

if (REDIS_USERNAME) {
    redisConf.username = REDIS_USERNAME;
}

if (REDIS_PASSWORD) {
    redisConf.password = REDIS_PASSWORD;
}

export const redis = new Redis(redisConf);

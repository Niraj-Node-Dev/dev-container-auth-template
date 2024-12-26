import * as crypto from 'crypto';
import { compare, genSaltSync, hash, } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserPayload } from './guard/auth.guard';
import { JWT_EXPIRES, JWT_SALT } from '../config';
import { UnauthorizedException } from '@nestjs/common';


export const md5 = (str: string) => {
    return crypto.createHash('md5').update(str).digest('hex');
};

export interface PostgresSortParams {
    limit?: number;
    offset?: number;
    orders?: {
        order: 'asc' | 'desc';
        orderColumn: string;
    }[];
}

export interface PostgresCompareSchema {
    key: string;
    isWildCard?: boolean;
    customCheck?: string;
    customQuery?: string;
    value: string | number | boolean | null;
}

export interface PostgresSearchParams {
    or?: PostgresCompareSchema[];
    and?: PostgresCompareSchema[];
    joinBothWith?: 'or' | 'and';
}

export interface JwtPayload {
    uid: string;
}

export interface Sha512Interface {
    salt: string;
    passwordHash: string;
}

export const jwtSign = (data: object) => {
    return jwt.sign(data, JWT_SALT, {
        algorithm: 'HS256',
        expiresIn: parseInt(JWT_EXPIRES) * 1000, // unix seconds
    });
};

export const jwtVerify = (token: string) => {
    return jwt.verify(token, JWT_SALT, {
        algorithms: ['HS256'],
    });
};

export async function comparePassword(plainPassword: string, passwordhash: string) {
    const isMatched = await compare(plainPassword, passwordhash);
    return isMatched;
}

export async function makeHash(plainPassword: string, salt: string): Promise<string | null> {
    return await hash(plainPassword, salt);
}

export async function generateSalt(round = 10) {
    return genSaltSync(round);
}

export async function generateSaltAndHash(userPassword: string): Promise<Sha512Interface> {
    const salt = await generateSalt();
    /** Gives us salt of length 16 */
    const passwordHash: string = (await makeHash(userPassword, salt)) as string;
    return {
        salt,
        passwordHash,
    };
}

export const validateJwt = (token: string, requ: any) => {
    try {
        const data = assertJwt(token);
        requ['user'] = data;
        return true;
    } catch (e) {
        return false;
    }
};

export const assertJwt = (token?: string) => {
    try {
        if (!token)
            throw new UnauthorizedException('Authorization is required for user validation.');
        if (token.includes('Bearer') === false) {
            throw new Error('Authorization should be "Bearer".');
        }
        const splitBearer = token.split(' ')[1];
        const jwt = jwtVerify(String(splitBearer)) as UserPayload | undefined;
        return jwt;
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            throw new Error('Token could not be parsed.');
        }
        throw e;
    }
};

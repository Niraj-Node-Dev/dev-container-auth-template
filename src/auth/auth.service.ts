import {
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { RoleAssignedRepository, RoleAvaialbleError, RoleAvailableRepository, UserError, UserRepository } from '../repo';
import { UserLoginDto, UserRegisterDto } from './dto';
import { DEFAULT_USER_ROLE } from '../config';
import { comparePassword, generateSaltAndHash, jwtSign } from '../utils';
import { UnautherizationError } from '../utils/error';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly roleAvailable: RoleAvailableRepository,
        private readonly roleAssigned: RoleAssignedRepository,
    ) { }

    async assertRoleAvailable(role: string) {
        const data = await this.roleAvailable.findOne({
            where: {
                name: role,
            },
        });

        if (!data) {
            throw new RoleAvaialbleError(`${role} is not available`);
        }

        return data;
    }

    async assertUserAvailableViaEmail(email: string) {
        const user = await this.userRepo.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            throw new UnautherizationError('Invalid email or password');
        }

        return user;
    }

    async register(data: UserRegisterDto) {
        try {
            const role = await this.assertRoleAvailable(DEFAULT_USER_ROLE);

            const existingUser = await this.userRepo.findOne({
                where: { email: data.email },
                withDeleted: true,
            });

            if (existingUser && !existingUser.deleted_at) {
                throw new ConflictException(`User with ${data.email} already exists`);
            }

            const user = existingUser || this.userRepo.create({ email: data.email });

            user.first_name = data.first_name;
            user.last_name = data.last_name;

            const { salt, passwordHash } = await generateSaltAndHash(data.password);
            user.salt = salt;
            user.password_hash = passwordHash;

            if (user.deleted_at) {
                user.deleted_at = null;
            }

            const savedUser = await this.userRepo.save(user);

            // assign him the role
            const roleAssignment = this.roleAssigned.create({
                user: savedUser,
                role: role,
            });

            const assignedUser = await this.roleAssigned.save(roleAssignment);

            return assignedUser;
        } catch (e) {
            if (e instanceof ConflictException) {
                throw new ConflictException(`User with ${data.email} already exists`);
            }
            const err = e as Error;
            console.error(err);
            throw new UserError(`Error while register an user ${err.message}'`);
        }
    }

    async login(data: UserLoginDto) {
        try {
            const user = await this.assertUserAvailableViaEmail(data.email);
            const isValidPassword = await comparePassword(data.password, user.password_hash)

            if (!isValidPassword) {
                throw new UnautherizationError(`Invalid email or password`);
            }

            const userRole = await this.roleAssigned.findOne({
                where: { user: { id: user.id } },
                relations: ['role'],
            });

            if (!userRole) {
                throw new UserError(`No role assigned to this user. Please contact admin.`);
            }

            const tokenData = { id: String(user.id), email: user.email, role: userRole.role.name };
            const encryptedData = jwtSign(tokenData);
            return encryptedData;
        } catch (e) {
            if (e instanceof UnautherizationError) {
                throw new UnautherizationError(`Invalid email or password `);
            }
            const err = e as Error;
            console.error(err);
            throw new UserError(`Error while loggin user ${err.message}`);
        }
    }

}

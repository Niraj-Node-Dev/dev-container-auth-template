import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    IsEmail,
    IsString,
    IsNotEmpty,
    MaxLength,
    MinLength,
    Matches,
} from 'class-validator';
import { ExceptionDto } from '../../utils/dispatchers';

export class UserRegisterDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @Transform((value) => value.value.trim())
    @ApiProperty({ maxLength: 255, required: true })
    email!: string;

    @MinLength(2, { message: 'First name must be at least 2 characters long' })
    @MaxLength(30, { message: 'First name must be less than 30 characters long' })
    @IsString({ message: 'First name must be a string' })
    @IsNotEmpty({ message: 'First name is required' })
    @Transform((value) => value.value.trim())
    @ApiProperty()
    first_name!: string;

    @MinLength(2, { message: 'Last name must be at least 2 characters long' })
    @MaxLength(30, { message: 'Last name must be less than 30 characters long' })
    @IsString({ message: 'Last name must be a string' })
    @IsNotEmpty({ message: 'Last name is required' })
    @Transform((value) => value.value.trim())
    @ApiProperty()
    last_name!: string;

    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
        message:
            'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character',
    })
    @Transform((value) => value.value.trim())
    @IsNotEmpty({ message: 'Password is required' })
    @ApiProperty()
    password!: string;
}

export class UserLoginDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @ApiProperty({
        maxLength: 255,
        required: true,
    })
    @Type(() => String)
    @Transform((value) => value.value.trim())
    @MaxLength(255)
    email!: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        required: true,
    })
    @Type(() => String)
    @Transform((value) => value.value.trim())
    password!: string;

}

export class UserCreatedResponse extends ExceptionDto { }

export class LoginResDto {
    @ApiProperty()
    @IsString()
    token!: string;
}

export class UserLoginResponseDto extends ExceptionDto {
    @ApiProperty({ type: LoginResDto })
    declare data: LoginResDto;
}

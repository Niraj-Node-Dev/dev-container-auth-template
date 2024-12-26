import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { UserCreatedResponse, UserLoginDto, UserLoginResponseDto, UserRegisterDto } from "./dto";
import { ExceptionDto } from "../utils/dispatchers";

@Controller('auth')
@ApiTags('Auth module')
export class AuthController {
    constructor(private readonly service: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiCreatedResponse({ description: 'User successfully registered.', type: UserCreatedResponse })
    @ApiConflictResponse({ description: 'User already exists', type: ExceptionDto })
    @ApiUnprocessableEntityResponse({
        description: 'Unprocessable entity - validation errors',
        type: ExceptionDto,
    })
    @HttpCode(201)
    async register(@Body() body: UserRegisterDto) {
        await this.service.register(body);
        return {
            message: `${body.first_name} has been successfully registered.`,
        };
    }


    @Post('login')
    @ApiOperation({ summary: 'Login user to get access of system' })
    @ApiOkResponse({ description: 'Successfully logged-in.', type: UserLoginResponseDto })
    @ApiUnauthorizedResponse({ description: 'Invalid email or password', type: ExceptionDto })
    @ApiUnprocessableEntityResponse({
        description: 'Unprocessable entity - validation errors',
        type: ExceptionDto,
    })
    @HttpCode(200)
    async login(@Body() body: UserLoginDto) {
        const data = await this.service.login(body);
        return {
            data: { token: data },
            message: `User successfully logged in.`,
        };
    }


}

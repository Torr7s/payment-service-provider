import { User } from '@prisma/client';
import { 
  Body,
  Controller, 
  Get, 
  HttpCode, 
  HttpStatus, 
  Post, 
  UseGuards, 
  UseInterceptors
} from '@nestjs/common';

import { AuthUser } from './decorators/auth-user.decorator';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SessionAuthGuard } from './guards/session-auth.guard';

import { TokenInterceptor } from './interceptors/token.interceptor';

import { AuthSignUpUseCase } from '@/app/use-cases/auth/sign-up';

import { SignUpDto } from '@/domain/dtos/authentication';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSignUpUseCase: AuthSignUpUseCase) {}

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TokenInterceptor)
  public async signIn(@AuthUser() user: User): Promise<User> {
    return user;
  }

  @Post('signup') 
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(TokenInterceptor)
  public async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authSignUpUseCase.exec(signUpDto);
  }

  @Get('me')
  @UseGuards(SessionAuthGuard, JwtAuthGuard)
  public me(@AuthUser() user: User): User {
    return user;
  }
} 

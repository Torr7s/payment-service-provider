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
import { UserEntity } from '@/domain/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSignUpUseCase: AuthSignUpUseCase) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(TokenInterceptor)
  public async signIn(@AuthUser() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @Post('signup') 
  @HttpCode(HttpStatus.CREATED)
  public async signUp(@Body() signUpDto: SignUpDto): Promise<UserEntity> {
    return this.authSignUpUseCase.exec(signUpDto);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(SessionAuthGuard, JwtAuthGuard)
  public me(@AuthUser() user: UserEntity): UserEntity {
    return user;
  }
} 

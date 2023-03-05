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

import { AuthUser } from '../core/auth/decorators/auth-user.decorator';

import { LocalAuthGuard } from '../core/auth/guards/local-auth.guard';
import { SessionAuthGuard } from '../core/auth/guards/session-auth.guard';
import { JwtAuthGuard } from '../core/auth/guards/jwt-auth.guard';

import { TokenInterceptor } from '../core/auth/interceptors/token.interceptor';

import { SignUpDto } from '../dtos/authentication';

import { UserEntity } from '@/src/app/entities/user.entity';
import { AuthSignUpUseCase } from '@/src/app/use-cases/auth/sign-up';

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
  public async signUp(@Body() signUpDto: SignUpDto): Promise<{ user: UserEntity }> {
    return this.authSignUpUseCase.exec(signUpDto);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(SessionAuthGuard, JwtAuthGuard)
  public me(@AuthUser() user: UserEntity): UserEntity {
    return user;
  }
} 

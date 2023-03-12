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

import { SignUpDto, UserDto } from '../dtos/authentication';
import { UserMapper } from '../mappers/user.mapper';


import { User } from '@/src/app/entities/user';
import { AuthSignUpUseCase } from '@/src/app/use-cases/auth/sign-up';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSignUpUseCase: AuthSignUpUseCase) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(TokenInterceptor)
  public async signIn(@AuthUser() user: User): Promise<{ user: UserDto }> {
    return {
      user: UserMapper.toDto(user)
    }
  }

  @Post('signup') 
  @HttpCode(HttpStatus.CREATED)
  public async signUp(@Body() signUpDto: SignUpDto): Promise<{ user: UserDto }> {
    const { user } = await this.authSignUpUseCase.exec(signUpDto);

    return {
      user: UserMapper.toDto(user)
    }
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(SessionAuthGuard, JwtAuthGuard)
  public me(@AuthUser() user: User): { user: UserDto } {
    return {
      user: UserMapper.toDto(user)
    }
  }
} 

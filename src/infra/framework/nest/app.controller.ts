import { User } from '@prisma/client';
import { 
  Body,
  Controller, 
  HttpCode, 
  HttpStatus, 
  Post 
} from '@nestjs/common';

import { AuthSignInUseCase } from '@/app/use-cases/auth/sign-in';
import { AuthSignUpUseCase } from '@/app/use-cases/auth/sign-up';

import { SignInDto, SignUpDto } from '@/domain/dtos/authentication';

@Controller('auth')
export class AppController {
  constructor(
    private readonly authSignInUseCase: AuthSignInUseCase,
    private readonly authSignUpUseCase: AuthSignUpUseCase
  ) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() signInDto: SignInDto): Promise<User> {
    return this.authSignInUseCase.exec(signInDto);
  }

  @Post('signup') 
  @HttpCode(HttpStatus.CREATED)
  public async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authSignUpUseCase.exec(signUpDto);
  }
} 

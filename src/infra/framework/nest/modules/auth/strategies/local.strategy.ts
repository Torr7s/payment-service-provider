import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-local';

import { AuthSignInUseCase } from '@/app/use-cases/auth/sign-in';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly signInUseCase: AuthSignInUseCase) {
    super({
      usernameField: 'email',
      passReqToCallback: false
    });
  }

  public async validate(email: string, password: string): Promise<User> {
    return this.signInUseCase.exec({
      email,
      password
    });
  }
}
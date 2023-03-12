import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthSignInUseCase } from '@/src/app/use-cases/auth/sign-in';

import { User } from '@/src/app/entities/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly signInUseCase: AuthSignInUseCase) {
    super({
      usernameField: 'email',
      passReqToCallback: false
    });
  }

  public async validate(email: string, password: string): Promise<User> {
    const { user } = await this.signInUseCase.exec({
      email,
      password
    });

    return user;
  }
}
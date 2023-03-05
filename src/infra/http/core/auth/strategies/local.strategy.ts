import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthSignInUseCase } from '@/src/app/use-cases/auth/sign-in';

import { UserEntity } from '@/src/app/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly signInUseCase: AuthSignInUseCase) {
    super({
      usernameField: 'email',
      passReqToCallback: false
    });
  }

  public async validate(email: string, password: string): Promise<UserEntity> {
    const { user } = await this.signInUseCase.exec({
      email,
      password
    });

    return user;
  }
}
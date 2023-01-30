import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthUseCase } from '@/app/use-cases/auth/auth';

import { JwtPayload } from '@/core/@types';

import { UserEntity } from '@/domain/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authUseCase: AuthUseCase) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: true,
      passReqToCallback: false
    });
  }

  public async validate(payload: JwtPayload): Promise<UserEntity> {
    return this.authUseCase.verifyPayload(payload);
  }
}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '@/src/types';

import { User } from '@/src/app/entities/user';
import { UserRepository } from '@/src/app/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: true,
      passReqToCallback: false
    });
  }

  public async validate(payload: JwtPayload): Promise<User> {
    let user: User;

    try {
      user = await this.userRepository.findOne({
        email: payload.sub
      });
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid user credentials'
      );
    }

    delete user.password;

    return user
  }
}
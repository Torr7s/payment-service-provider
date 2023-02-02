import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '@/@types';

import { UserEntity } from '@/domain/entities/user.entity';
import { UserRepository } from '@/app/abstracts/repositories/user.repository';

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

  public async validate(payload: JwtPayload): Promise<{ user: UserEntity }> {
    /**
     * TODO:
     * 
     * Check why payload.sub is not being fullfiled correctly, resulting in a Prisma.ClientKnownValidationError
     */
    let user: UserEntity;

    try {
      user = await this.userRepository.findByEmail(payload.sub);
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid user credentials'
      );
    }

    delete user.password;

    return {
      user
    }
  }
}
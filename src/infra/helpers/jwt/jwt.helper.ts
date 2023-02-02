import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from '@/@types';

import { UserEntity } from '@/domain/entities/user.entity';

const jwtService = new JwtService({
  secret: process.env.JWT_SECRET_KEY,
  signOptions: {
    algorithm: 'HS384',
    expiresIn: '12h'
  },
  verifyOptions: {
    algorithms: [
      'HS384'
    ],
    ignoreExpiration: false
  }
});

export const signToken = (user: UserEntity): string => {
  const payload: JwtPayload = {
    sub: user.email
  }

  return jwtService.sign(payload);
}
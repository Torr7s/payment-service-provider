import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from '@/src/types';

import { User } from '@/src/app/entities/user';

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

export const signToken = (user: User): string => {
  const payload: JwtPayload = {
    sub: user.email
  }

  return jwtService.sign(payload);
}
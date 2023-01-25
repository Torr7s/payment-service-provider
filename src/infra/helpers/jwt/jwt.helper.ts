import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

const jwtService = new JwtService({
  secret: process.env.JWT_SECRET_KEY,
  signOptions: {
    algorithm: 'HS384',
    expiresIn: '1d'
  },
  verifyOptions: {
    algorithms: [
      'HS384'
    ],
    ignoreExpiration: false
  }
});

export const signToken = (user: User): string => {
  const payload = {
    sub: user.email
  }

  return jwtService.sign(payload);
}
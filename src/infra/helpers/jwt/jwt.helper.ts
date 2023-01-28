import { JwtPayload } from '@/core/@types';
import { UserEntity } from '@/domain/entities/user.entity';
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

export const signToken = (user: UserEntity): string => {
  const payload: JwtPayload = {
    sub: user.id,
    email: user.email,
    consumerId: user.consumerProfile.id
  }

  return jwtService.sign(payload);
}
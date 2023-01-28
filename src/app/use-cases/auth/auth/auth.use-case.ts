import { UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { JwtPayload } from '@/core/@types';

import { IAuthUseCase } from '@/domain/use-cases/auth';

import { signToken as signTokenHelper } from '@/infra/helpers/jwt/jwt.helper';

export class AuthUseCase implements IAuthUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public signToken(user: User): string {
    return signTokenHelper(user);
  }

  public async verifyPayload(payload: JwtPayload): Promise<User> {
    const user: User = await this.userRepository.findByEmail(payload.sub);

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials'
      );
    }

    delete user.password;

    return user;
  }
}
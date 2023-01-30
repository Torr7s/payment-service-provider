import { UnauthorizedException } from '@nestjs/common';

import { JwtPayload } from '@/@types';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { IAuthUseCase } from '@/domain/use-cases/auth';
import { UserEntity } from '@/domain/entities/user.entity';

import { signToken as signTokenHelper } from '@/infra/helpers/jwt';

export class AuthUseCase implements IAuthUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public signToken(user: UserEntity): string {
    return signTokenHelper(user);
  }

  public async verifyPayload(payload: JwtPayload): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials'
      );
    }

    delete user.password;

    return user;
  }
}
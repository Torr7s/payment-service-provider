import { HttpStatus } from '@nestjs/common';

import { JwtPayload } from '@/@types';

import { AuthException } from '@/app/exceptions/auth.exception';
import { IAuthUseCase } from '@/domain/use-cases/auth';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
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
      throw new AuthException(
        'Invalid credentials', 
        HttpStatus.UNAUTHORIZED
      );
    }

    delete user.password;

    return user;
  }
}
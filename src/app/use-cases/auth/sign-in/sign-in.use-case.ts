import { HttpStatus } from '@nestjs/common';

import { AuthException } from '@/app/exceptions/auth.exception';

import { IAuthSignInUseCase, IAuthSignInRequest } from '@/domain/use-cases/auth';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { UserEntity } from '@/domain/entities/user.entity';

import { compareStrings } from '@/infra/helpers/bcrypt';

export class AuthSignInUseCase implements IAuthSignInUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(input: IAuthSignInRequest): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new AuthException(
        'Invalid credentials',
        HttpStatus.UNAUTHORIZED
      );
    }

    const validPassword: boolean = await compareStrings(
      input.password, 
      user.password
    );

    if (!validPassword) {
      throw new AuthException(
        'Invalid credentials',
        HttpStatus.UNAUTHORIZED
      );
    }

    delete user.password;

    return user;
  }
}
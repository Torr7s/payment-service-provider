import { HttpStatus } from '@nestjs/common';

import { AuthRepository } from '@/app/abstracts/repositories/auth.repository';
import { AuthException } from '@/app/exceptions/auth.exception';

import { IAuthSignUpUseCase, IAuthSignUpRequest } from '@/domain/use-cases/auth';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { UserEntity } from '@/domain/entities/user.entity';

import { hashString } from '@/infra/helpers/bcrypt';

export class AuthSignUpUseCase implements IAuthSignUpUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async exec(input: IAuthSignUpRequest): Promise<UserEntity> {
    const userAlreadyExists: UserEntity = await this.userRepository.findByEmail(input.email);

    if (userAlreadyExists) {
      throw new AuthException(
        'E-mail address already taken',
        HttpStatus.BAD_REQUEST
      );
    }

    const user: UserEntity = await this.authRepository.signUp({
      ...input,
      password: await hashString(input.password)
    });

    delete user.password;

    return user;
  }
}
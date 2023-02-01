import { HttpStatus } from '@nestjs/common';

import { UseCase } from '../../use-case';

import { AuthException } from '@/app/exceptions/auth.exception';

import { AuthSignUpInput, AuthSignUpOutput } from '@/domain/use-cases/auth';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { UserEntity } from '@/domain/entities/user.entity';

import { hashString } from '@/infra/helpers/bcrypt';

export class AuthSignUpUseCase implements
  UseCase<
    AuthSignUpInput,
    AuthSignUpOutput
  > {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(input: AuthSignUpInput): Promise<AuthSignUpOutput> {
    const userAlreadyExists: UserEntity = await this.userRepository.findByEmail(input.email);

    if (userAlreadyExists) {
      throw new AuthException(
        'Invalid user registration! E-mail address already taken',
        HttpStatus.BAD_REQUEST
      );
    }

    const user: UserEntity = await this.userRepository.create({
      ...input,
      password: await hashString(input.password)
    });

    delete user.password;

    return {
      user
    }
  }
}
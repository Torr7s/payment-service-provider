import { HttpStatus } from '@nestjs/common';

import { UseCase } from '../../use-case';

import { AuthException } from '@/app/exceptions/auth.exception';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { UserEntity } from '@/app/entities/user.entity';

import { BcryptHelper } from '@/infra/helpers/bcrypt';

export interface AuthSignUpInput {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthSignUpOutput {
  user: UserEntity;
}

export class AuthSignUpUseCase implements
  UseCase<
    AuthSignUpInput,
    AuthSignUpOutput
  > {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(input: AuthSignUpInput): Promise<AuthSignUpOutput> {
    const userAlreadyExists: UserEntity = await this.userRepository.findOne({
      email: input.email
    });

    if (userAlreadyExists) {
      throw new AuthException(
        'Invalid user registration! E-mail address already taken',
        HttpStatus.BAD_REQUEST
      );
    }

    input.password = await BcryptHelper.hashString(input.password)

    const user: UserEntity = await this.userRepository.create(input);

    delete user.password;

    return {
      user
    }
  }
}
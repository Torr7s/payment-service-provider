import { HttpStatus } from '@nestjs/common';

import { UseCase } from '../../use-case';

import { AuthException } from '@/app/exceptions/auth.exception';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { UserEntity } from '@/app/entities/user.entity';

import { BcryptHelper } from '@/app/helpers/bcrypt';

export interface AuthSignInInput {
  email: string;
  password: string;
}

export interface AuthSignInOutput {
  user: UserEntity;
}

export class AuthSignInUseCase implements
  UseCase<
    AuthSignInInput,
    AuthSignInOutput
  > {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(input: AuthSignInInput): Promise<AuthSignInOutput> {
    const user: UserEntity = await this.userRepository.findOne({
      email: input.email
    });

    if (!user) {
      throw new AuthException(
        'Invalid credentials',
        HttpStatus.UNAUTHORIZED
      );
    }

    const validPassword: boolean = await BcryptHelper.compareStrings(input.password, user.password);

    if (!validPassword) {
      throw new AuthException(
        'Invalid credentials',
        HttpStatus.UNAUTHORIZED
      );
    }

    delete user.password;

    return {
      user
    }
  }
}
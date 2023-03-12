import { HttpStatus } from '@nestjs/common';

import { UseCase } from '../../use-case';

import { User } from '@/src/app/entities/user';
import { UserRepository } from '@/src/app/repositories/user.repository';
import { AuthException } from '@/src/app/exceptions/auth.exception';

import { BcryptHelper } from '@/src/app/helpers/bcrypt';

export interface AuthSignInInput {
  email: string;
  password: string;
}

export interface AuthSignInOutput {
  user: User;
}

export class AuthSignInUseCase implements
  UseCase<
    AuthSignInInput,
    AuthSignInOutput
  > {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(input: AuthSignInInput): Promise<AuthSignInOutput> {
    const user: User = await this.userRepository.findOne({
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

    return {
      user
    }
  }
}
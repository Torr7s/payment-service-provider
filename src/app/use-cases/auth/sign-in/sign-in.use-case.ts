import { HttpStatus } from '@nestjs/common';

import { AuthException } from '@/app/exceptions/auth.exception';

import { AuthSignInInput, AuthSignInOutput } from '@/domain/use-cases/auth';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { UserEntity } from '@/domain/entities/user.entity';

import { compareStrings } from '@/infra/helpers/bcrypt';
import { UseCase } from '../../use-case';

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

    const validPassword: boolean = await compareStrings(input.password, user.password);

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
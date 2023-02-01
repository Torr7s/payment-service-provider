import { HttpStatus } from '@nestjs/common';

import { UseCase } from '../../use-case';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { UserException } from '@/app/exceptions/user.exception';
import { UserEntity } from '@/domain/entities/user.entity';

import { FindUserByEmailUseCaseInput, FindUserByEmailUseCaseOutput } from '@/domain/use-cases/users';

export class FindUserByEmailUseCase implements
  UseCase<
    FindUserByEmailUseCaseInput,
    FindUserByEmailUseCaseOutput
  > {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(input: FindUserByEmailUseCaseInput): Promise<FindUserByEmailUseCaseOutput> {
    const user: UserEntity = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new UserException(
        'Invalid user credentials were provided! No user found',
        HttpStatus.BAD_REQUEST
      );
    }

    delete user.password;

    return {
      user
    };
  }
}
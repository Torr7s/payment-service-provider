import { HttpStatus } from '@nestjs/common';

import { UseCase } from '../../use-case';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { UserEntity } from '@/domain/entities/user.entity';
import { UserException } from '@/app/exceptions/user.exception';

import { FindUserUseCaseInput, FindUserUseCaseOutput } from '@/domain/use-cases/users';

export class FindUserUseCase implements
  UseCase<
    FindUserUseCaseInput,
    FindUserUseCaseOutput
  > {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(input: FindUserUseCaseInput): Promise<FindUserUseCaseOutput> {
    const user: UserEntity = await this.userRepository.findOne(input.where);

    if (!user) {
      throw new UserException(
        'Invalid user credentials were provided! No user found',
        HttpStatus.BAD_REQUEST
      );
    }

    delete user.password;

    return {
      user
    }
  }
}
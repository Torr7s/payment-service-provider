import { HttpStatus } from '@nestjs/common';

import { UseCase } from '../../use-case';

import { User } from '@/src/app/entities/user';
import { UserRepository } from '@/src/app/repositories/user.repository';
import { UserException } from '@/src/app/exceptions/user.exception';

import { UserWhereFilter } from '@/src/types';

export interface FindUserUseCaseInput {
  where: UserWhereFilter;
}

export interface FindUserUseCaseOutput {
  user: User;
}

export class FindUserUseCase implements
  UseCase<
    FindUserUseCaseInput,
    FindUserUseCaseOutput
  > {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(input: FindUserUseCaseInput): Promise<FindUserUseCaseOutput> {
    const user: User = await this.userRepository.findOne(input.where);

    if (!user) {
      throw new UserException(
        'Invalid user credentials were provided! No user found',
        HttpStatus.BAD_REQUEST
      );
    }

    return {
      user
    }
  }
}
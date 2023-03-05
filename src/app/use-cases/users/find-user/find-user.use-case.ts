import { HttpStatus } from '@nestjs/common';

import { UseCase } from '../../use-case';

import { UserEntity } from '@/src/app/entities/user.entity';
import { UserRepository } from '@/src/app/repositories/user.repository';
import { UserException } from '@/src/app/exceptions/user.exception';

import { UserWhereFilter } from '@/src/types';

export interface FindUserUseCaseInput {
  where: UserWhereFilter;
}

export interface FindUserUseCaseOutput {
  user: UserEntity;
}

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
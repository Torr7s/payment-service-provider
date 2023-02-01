import { HttpStatus } from '@nestjs/common';

import { UseCase } from '../../use-case';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { UserException } from '@/app/exceptions/user.exception';
import { UserEntity } from '@/domain/entities/user.entity';

import { FindUserByIdUseCaseInput, FindUserByIdUseCaseOutput } from '@/domain/use-cases/users/find-user-by-id.use-case';

export class FindUserByIdUseCase implements
  UseCase<
    FindUserByIdUseCaseInput,
    FindUserByIdUseCaseOutput
  > {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(input: FindUserByIdUseCaseInput): Promise<FindUserByIdUseCaseOutput> {
    const user: UserEntity = await this.userRepository.findById(input.id);

    if (!user) {
      throw new UserException(
        'No user were found with the given ID',
        HttpStatus.BAD_REQUEST
      );
    }

    delete user.password;

    return {
      user
    }
  }
}
import { HttpStatus } from '@nestjs/common';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { UserException } from '@/app/exceptions/user.exception';
import { UserEntity } from '@/domain/entities/user.entity';

import { IFindUserByIdUseCase } from '@/domain/use-cases/users/find-user-by-id.use-case';

export class FindUserByIdUseCase implements IFindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findById(id);

    if (!user) {
      throw new UserException(
        'No user were found with the given ID',
        HttpStatus.BAD_REQUEST
      );
    }

    delete user.password;

    return user;
  }
}
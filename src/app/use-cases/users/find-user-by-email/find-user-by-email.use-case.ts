import { HttpStatus } from '@nestjs/common';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';
import { UserException } from '@/app/exceptions/user.exception';
import { UserEntity } from '@/domain/entities/user.entity';

import { IFindUserByEmailUseCase } from '@/domain/use-cases/users';

export class FindUserByEmailUseCase implements IFindUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(email: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserException(
        'No user were found with the given email',
        HttpStatus.BAD_REQUEST
      );
    }

    delete user.password;

    return user;
  }
}
import { BadRequestException } from '@nestjs/common';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { UserEntity } from '@/domain/entities/user.entity';

import { IFindUserByIdUseCase } from '@/domain/use-cases/users/find-user-by-id.use-case';

export class FindUserByIdUseCase implements IFindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findById(id);

    if (!user) {
      throw new BadRequestException('Invalid user', {
        description: 'No user were found with the given ID'
      });
    }

    delete user.password;

    return user;
  }
}
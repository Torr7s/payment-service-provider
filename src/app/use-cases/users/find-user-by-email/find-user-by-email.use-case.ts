import { BadRequestException } from '@nestjs/common';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { UserEntity } from '@/domain/entities/user.entity';

import { IFindUserByEmailUseCase } from '@/domain/use-cases/users';

export class FindUserByEmailUseCase implements IFindUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(email: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid email given', {
        description: 'No user were found with the given e-mail address'
      });
    }

    delete user.password;

    return user;
  }
}
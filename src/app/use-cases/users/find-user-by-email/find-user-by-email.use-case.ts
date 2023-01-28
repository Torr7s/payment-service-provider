import { BadRequestException } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { IFindUserByEmailUseCase } from '@/domain/use-cases/users';
import { UserEntity } from '@/domain/entities/user.entity';

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
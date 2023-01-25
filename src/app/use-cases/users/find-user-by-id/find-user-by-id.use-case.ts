import { BadRequestException } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { IFindUserByIdUseCase } from '@/domain/use-cases/users/find-user-by-id.use-case';

export class FindUserByIdUseCase implements IFindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(id: string): Promise<User> {
    const user: User = await this.userRepository.findById(id);

    if (!user) {
      throw new BadRequestException('Invalid user', {
        description: 'No user were found with the given ID'
      });
    }

    delete user.password;

    return user;
  }
}
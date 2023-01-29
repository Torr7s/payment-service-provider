import { BadRequestException } from '@nestjs/common';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { UserEntity } from '@/domain/entities/user.entity';

import { IAuthSignInUseCase, IAuthSignInRequest } from '@/domain/use-cases/auth';

import { compareStrings } from '@/infra/helpers/bcrypt';

export class AuthSignInUseCase implements IAuthSignInUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(input: IAuthSignInRequest): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new BadRequestException(
        'Invalid credentials'
      );
    }

    if (!(await compareStrings(input.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    delete user.password;

    return user;
  }
}
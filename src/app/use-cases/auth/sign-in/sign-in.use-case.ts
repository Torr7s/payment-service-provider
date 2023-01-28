import { BadRequestException } from '@nestjs/common';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { SignInDto } from '@/domain/dtos/authentication/sign-in.dto';
import { UserEntity } from '@/domain/entities/user.entity';

import { IAuthSignInUseCase } from '@/domain/use-cases/auth';

import { compareStrings } from '@/infra/helpers/bcrypt';

export class AuthSignInUseCase implements IAuthSignInUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(signInDto: SignInDto): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findByEmail(signInDto.email);

    if (!user) {
      throw new BadRequestException(
        'Invalid credentials'
      );
    }

    if (!(await compareStrings(signInDto.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    delete user.password;

    return user;
  }
}
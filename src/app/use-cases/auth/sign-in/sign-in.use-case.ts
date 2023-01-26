import { UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { IAuthSignInUseCase } from '@/domain/use-cases/auth';
import { SignInDto } from '@/domain/dtos/authentication/sign-in.dto';

import { compareStrings } from '@/infra/helpers/bcrypt';

export class AuthSignInUseCase implements IAuthSignInUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async exec(signInDto: SignInDto): Promise<User> {
    const user: User = await this.userRepository.findByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials'
      );
    }

    if (!(await compareStrings(signInDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    delete user.password;

    return user;
  }
}
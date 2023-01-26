import { UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';

import { AuthRepository } from '@/app/abstracts/repositories/auth.repository';
import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { SignUpDto } from '@/domain/dtos/authentication/sign-up.dto';

import { IAuthSignUpUseCase } from '@/domain/use-cases/auth';

import { hashString } from '@/infra/helpers/bcrypt';

export class AuthSignUpUseCase implements IAuthSignUpUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async exec(signUpDto: SignUpDto): Promise<User> {
    const userAlreadyExists: User = await this.userRepository.findByEmail(signUpDto.email);

    if (userAlreadyExists) {
      throw new UnauthorizedException('Invalid registration', {
        description: 'Email already taken'
      });
    }

    const hashedPassword: string = await hashString(signUpDto.password);

    const user: User = await this.authRepository.signUp({
      email: signUpDto.email,
      fullName: signUpDto.fullName,
      password: hashedPassword
    });

    delete user.password;

    return user;
  }
}
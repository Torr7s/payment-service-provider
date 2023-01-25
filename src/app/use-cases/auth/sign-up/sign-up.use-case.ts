import { UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';

import { AuthenticationRepository } from '@/app/abstracts/repositories/authentication.repository';

import { SignUpDto } from '@/domain/dtos/authentication/sign-up.dto';

import { IAuthSignUpUseCase } from '@/domain/use-cases/auth';
import { IFindUserByEmailUseCase } from '@/domain/use-cases/users';

import { hashString } from '@/infra/helpers/bcrypt';

export class AuthSignUpUseCase implements IAuthSignUpUseCase {
  constructor(
    private readonly authRepository: AuthenticationRepository,
    private readonly findUserByEmailUseCase: IFindUserByEmailUseCase
  ) {}

  public async exec(signUpDto: SignUpDto): Promise<User> {
    const userRecord: User = await this.findUserByEmailUseCase.exec(signUpDto.email);

    if (userRecord) {
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
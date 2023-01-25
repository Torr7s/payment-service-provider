import { UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';

import { IAuthSignInUseCase } from '@/domain/use-cases/auth';
import { IFindUserByEmailUseCase } from '@/domain/use-cases/users';

import { SignInDto } from '@/domain/dtos/authentication/sign-in.dto';

import { compareStrings } from '@/infra/helpers/bcrypt';

export class AuthSignInUseCase implements IAuthSignInUseCase {
  constructor(private readonly findUserByEmailUseCase: IFindUserByEmailUseCase) {}

  public async exec(signInDto: SignInDto): Promise<User> {
    const user: User = await this.findUserByEmailUseCase.exec(signInDto.email);

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
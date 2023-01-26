import { UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';

import { JwtPayload } from '@/core/@types';

import { IAuthAuthenticateUseCase } from '@/domain/use-cases/auth';
import { IFindUserByEmailUseCase } from '@/domain/use-cases/users';

import { signToken as signTokenHelper } from '@/infra/helpers/jwt/jwt.helper';

export class AuthAuthenticateUseCase implements IAuthAuthenticateUseCase {
  constructor(private readonly findUserByEmailUseCase: IFindUserByEmailUseCase) {}

  public signToken(user: User): string {
    return signTokenHelper(user);
  }

  public async verifyPayload(payload: JwtPayload): Promise<User> {
    const user = await this.findUserByEmailUseCase.exec(payload.sub);

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials'
      );
    }

    delete user.password;

    return user;
  }
}
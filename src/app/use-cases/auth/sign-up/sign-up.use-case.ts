import { BadRequestException } from '@nestjs/common';

import { AuthRepository } from '@/app/abstracts/repositories/auth.repository';
import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { UserEntity } from '@/domain/entities/user.entity';

import { IAuthSignUpUseCase, IAuthSignUpRequest } from '@/domain/use-cases/auth';

import { hashString } from '@/infra/helpers/bcrypt';

export class AuthSignUpUseCase implements IAuthSignUpUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async exec(input: IAuthSignUpRequest): Promise<UserEntity> {
    const userAlreadyExists: UserEntity = await this.userRepository.findByEmail(input.email);

    if (userAlreadyExists) {
      throw new BadRequestException('Invalid registration', {
        description: 'Email already taken'
      });
    }

    const hashedPassword: string = await hashString(input.password);

    const user: UserEntity = await this.authRepository.signUp({
      email: input.email,
      fullName: input.fullName,
      password: hashedPassword
    });

    delete user.password;

    return user;
  }
}
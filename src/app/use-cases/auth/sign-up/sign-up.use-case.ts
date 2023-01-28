import { BadRequestException } from '@nestjs/common';

import { AuthRepository } from '@/app/abstracts/repositories/auth.repository';
import { UserRepository } from '@/app/abstracts/repositories/user.repository';

import { SignUpDto } from '@/domain/dtos/authentication/sign-up.dto';

import { UserEntity } from '@/domain/entities/user.entity';

import { IAuthSignUpUseCase } from '@/domain/use-cases/auth';

import { hashString } from '@/infra/helpers/bcrypt';

export class AuthSignUpUseCase implements IAuthSignUpUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async exec(signUpDto: SignUpDto): Promise<UserEntity> {
    const userAlreadyExists: UserEntity = await this.userRepository.findByEmail(signUpDto.email);

    if (userAlreadyExists) {
      throw new BadRequestException('Invalid registration', {
        description: 'Email already taken'
      });
    }

    const hashedPassword: string = await hashString(signUpDto.password);

    const user: UserEntity = await this.authRepository.signUp({
      email: signUpDto.email,
      fullName: signUpDto.fullName,
      password: hashedPassword
    });

    delete user.password;

    return user;
  }
}
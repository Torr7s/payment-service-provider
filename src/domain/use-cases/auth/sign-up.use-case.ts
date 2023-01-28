import { SignUpDto } from '@/domain/dtos/authentication/sign-up.dto';

import { UserEntity } from '@/domain/entities/user.entity';

export interface IAuthSignUpUseCase {
  exec: (signUpDto: SignUpDto) => Promise<UserEntity>;
}
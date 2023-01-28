import { UserEntity } from '../entities/user.entity';

import { SignUpDto } from '@/domain/dtos/authentication/sign-up.dto';

export interface IAuthenticationRepository {
  signUp: (signUpDto: SignUpDto) => Promise<UserEntity>;
}
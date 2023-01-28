import { User } from '@prisma/client';

import { SignUpDto } from '@/domain/dtos/authentication/sign-up.dto';
import { UserEntity } from '../entities/user.entity';

export interface IAuthenticationRepository {
  signUp: (signUpDto: SignUpDto) => Promise<UserEntity>;
}
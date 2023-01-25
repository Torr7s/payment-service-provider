import { User } from '@prisma/client';

import { SignUpDto } from '@/domain/dtos/authentication/sign-up.dto';

export interface IAuthenticationRepository {
  signUp: (signUpDto: SignUpDto) => Promise<User>;
}
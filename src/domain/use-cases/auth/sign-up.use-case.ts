import { User } from '@prisma/client';

import { SignUpDto } from '@/domain/dtos/authentication/sign-up.dto';

export interface IAuthSignUpUseCase {
  exec: (signUpDto: SignUpDto) => Promise<User>;
}
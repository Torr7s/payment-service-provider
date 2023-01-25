import { User } from '@prisma/client';

import { SignInDto } from '@/domain/dtos/authentication/sign-in.dto';

export interface IAuthSignInUseCase {
  exec: (signInDto: SignInDto) => Promise<User>;
}
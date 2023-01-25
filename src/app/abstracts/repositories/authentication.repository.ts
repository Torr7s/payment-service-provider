import { User } from '@prisma/client';

import { IAuthenticationRepository } from '@/domain/repositories/authentication.repository';

import { SignUpDto } from '@/domain/dtos/authentication';

export abstract class AuthenticationRepository implements IAuthenticationRepository {
  public abstract signUp: (signUpDto: SignUpDto) => Promise<User>;
}
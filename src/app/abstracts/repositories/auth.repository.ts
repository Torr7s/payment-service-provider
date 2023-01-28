import { User } from '@prisma/client';

import { IAuthenticationRepository } from '@/domain/repositories/authentication.repository';

import { SignUpDto } from '@/domain/dtos/authentication';
import { UserEntity } from '@/domain/entities/user.entity';

export abstract class AuthRepository implements IAuthenticationRepository {
  public abstract signUp: (signUpDto: SignUpDto) => Promise<UserEntity>;
}
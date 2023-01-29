import { UserEntity } from '@/domain/entities/user.entity';

import { IAuthenticationRepository } from '@/domain/repositories/authentication.repository';

export abstract class AuthRepository implements IAuthenticationRepository {
  public abstract signUp: (data: UserEntity) => Promise<UserEntity>;
}
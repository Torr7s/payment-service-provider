import { UserEntity } from '@/domain/entities/user.entity';

import { IUserRepository } from '@/domain/repositories/user.repository';

export abstract class UserRepository implements IUserRepository {
  public abstract findByEmail: (email: string) => Promise<UserEntity>;
  public abstract findById: (id: string) => Promise<UserEntity>;
}
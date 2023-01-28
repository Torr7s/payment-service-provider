import { User } from '@prisma/client';

import { IUserRepository } from '@/domain/repositories/user.repository';
import { UserEntity } from '@/domain/entities/user.entity';

export abstract class UserRepository implements IUserRepository {
  public abstract findByEmail: (email: string) => Promise<UserEntity>;
  public abstract findById: (id: string) => Promise<UserEntity>;
}
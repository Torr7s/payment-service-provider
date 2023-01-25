import { User } from '@prisma/client';

import { IUserRepository } from '@/domain/repositories/user.repository';

export abstract class UserRepository implements IUserRepository {
  public abstract findByEmail: (email: string) => Promise<User>;
  public abstract findById: (id: string) => Promise<User>;
}
import { User } from '../entities/user';
import { UserWhereFilter } from '@/src/types';

export abstract class UserRepository {
  public abstract create: (data: User) => Promise<User>;
  public abstract findOne: (where: UserWhereFilter) => Promise<User | null>;
}
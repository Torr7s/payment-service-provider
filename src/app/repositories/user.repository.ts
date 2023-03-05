import { UserEntity } from '../entities/user.entity';
import { UserWhereFilter } from '@/src/types';

export abstract class UserRepository {
  public abstract create: (data: UserEntity) => Promise<UserEntity>;
  public abstract findOne: (where: UserWhereFilter) => Promise<UserEntity>;
}
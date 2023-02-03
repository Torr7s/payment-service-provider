import { UserWhereFilter } from '@/@types';

import { UserEntity } from '@/domain/entities/user.entity';
import { IUserRepository } from '@/domain/repositories/user.repository';

export abstract class UserRepository implements IUserRepository {
  public abstract create: (data: UserEntity) => Promise<UserEntity>;
  public abstract findOne: (where: UserWhereFilter) => Promise<UserEntity>;
}